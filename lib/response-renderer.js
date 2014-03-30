"use strict";

var errors = require('./errors');
var _ = require('underscore');
var actions = require('./actions');


function renderResponseData(res, responseData, isJsonp) {

	responseData.messages = _.map(responseData.messages, function (message) {
		if (message instanceof Error) {
			return message.message;
		}
		return message;
	});
	if (isJsonp) {
		return res.jsonp(responseData);
	}

	return res.json(responseData);
}

function responseRenderer(options) {

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	function rendererConfigured(req, res) {

		var isJsonp = !!req.param(options.jsonp),
			isAlwaysSuccess = !!req.param(options.noError);

		/**
		 * @param {Error|null} error
		 * @param {Object} data
		 * @param {String|Array} messages
		 */
		return function render(error, data, messages) {

			var statusCode = 200,
				responseData = data || {};

			responseData.messages = messages && (_.isArray(messages) ? messages : [messages]) || [];

			if (res.exception) {
				responseData.messages.unshift(res.exception);
			}

			if (error) {
				responseData.messages.unshift(error);
			}

			if (error && !isAlwaysSuccess) {

				if (error instanceof errors.ActionNotFoundError ||
					error instanceof errors.ControllerNotFoundError) {
					statusCode = 501;
				} else if (error  instanceof errors.NotFoundError) {
					statusCode = 404;
				} else {
					statusCode = 500;
				}
			}
			res.status(statusCode);

			if (options.renderer === null) {
				return renderResponseData(res, responseData, isJsonp);
			} else {
				try {
					return options.renderer(res, error, responseData, isJsonp);
				} catch (error) {
					if (res.exception) {
						return renderResponseData(res, responseData, isJsonp);
					}
					res.exception = error;
					return actions.exception(req, rendererConfigured(req, res));
				}
			}
		};
	}

	return rendererConfigured;

}

module.exports = exports = responseRenderer;
