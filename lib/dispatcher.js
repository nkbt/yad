'use strict';

var path = require('path');
var errors = require('./errors');
var root = null;
var responseRenderer = null;

/**
 * @param {String} _root
 */
exports.setRoot = function (_root) {
	root = _root;
};

/**
 * @param {Function} _responseRenderer
 */
exports.setResponseRenderer = function (_responseRenderer) {
	responseRenderer = _responseRenderer
};

/**
 * @param {ExpressServerRequest} req
 * @param {ExpressServerResponse} res
 */
function renderer(req, res) {

	/**
	 * @param {Error|null} error
	 * @param {Object} data
	 * @param {String|Array} messages
	 */
	function render(error, data, messages) {

		messages = messages || [];
		var statusCode = 200,
			responseData = data || {};

		responseData.messages = Object.prototype.toString.call(messages) === '[object Array]' ? messages : [messages];
		if (res.exception) {
			responseData.messages.unshift(res.exception.message);
		}

		if (error) {

			if (error instanceof errors.ActionNotFoundError
				|| error instanceof errors.ControllerNotFoundError
				|| error  instanceof errors.NotFoundError) {
				statusCode = 404;
			} else {
				statusCode = 502;
			}
		}
		res.status(statusCode);

		if (responseRenderer === null) {
			return res.json(responseData);
		} else {
			return responseRenderer(res, error, responseData);
		}
	}

	return render;
}

function exception(req, next) {
	next(new errors.DispatcherError('Application Error'));
}

function rootNotSet(req, next) {
	next(new errors.DispatcherError('Root not set'));
}

function noAction(req, next) {
	next(new errors.ActionNotFoundError(['Action not found:', req.actionName].join(' ')));
}

function noController(req, next) {
	next(new errors.ControllerNotFoundError(['Controller not found:', req.controllerName].join(' ')));
}


exports.route = function (controllerName, actionName) {

	/**
	 * @param {ExpressServerRequest} req
	 * @param {ExpressServerResponse} res
	 */
	function run(req, res) {
		req.actionName = actionName;
		req.controllerName = controllerName;
		var action, controllerPath = path.join(root, controllerName);

		if (root === null) {
			action = rootNotSet;
		} else {
			try {
				action = require(controllerPath)[actionName] || noAction;
			} catch (error) {
				res.exception = error;
				action = noController;
			}
		}


		try {
			return action(req, renderer(req, res));
		} catch (error) {
			res.exception = error;
			return exception(req, renderer(req, res));
		}
	}

	return run;
};

exports.errors = errors;