'use strict';

var path = require('path');
var errors = require('./errors');
var root = null;

/**
 * @param {String} _root
 */
exports.setRoot = function (_root) {
	root = _root;
};

/**
 * @param {ExpressServerRequest} req
 * @param {ExpressServerResponse} res
 */
function renderer(req, res) {

	/**
	 * @param {Error|null} error
	 * @param {Object} data
	 */
	function render(error, data) {

		var statusCode = 200, response = data || {};

		if (error !== null) {

			if (error instanceof errors.ActionNotFoundError || error instanceof errors.ControllerNotFoundError) {
				statusCode = 404;
			} else {
				statusCode = 502;
			}

			response.message = error.message;
		}

		return res.json(statusCode, response);
	}

	return render;
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
		console.log("controllerPath", controllerPath);

		if (root === null) {
			action = rootNotSet;
		} else {
			try {
				action = require(controllerPath)[actionName] || noAction;
			} catch (error) {
				action = noController;
			}
		}


		return action(req, renderer(req, res));
	}

	return run;
};