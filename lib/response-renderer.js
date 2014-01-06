"use strict";

var errors = require('./errors');

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

			messages = messages || [];
			var statusCode = 200,
				responseData = data || {};

			responseData.messages = Object.prototype.toString.call(messages) === '[object Array]' ? messages : [messages];
			if (res.exception) {
				responseData.messages.unshift(res.exception);
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

			if (responseRenderer === null) {
				if (isJsonp) {
					return res.jsonp(responseData);
				} else {
					return res.json(responseData);
				}
			} else {
				try {
					return responseRenderer(res, error, responseData, isJsonp);
				} catch (error) {
					if (res.exception) {
						if (isJsonp) {
							return res.jsonp(responseData);
						} else {
							return res.json(responseData);
						}
					}
					res.exception = error;
					return exception(req, rendererConfigured(req, res));
				}
			}
		};
	}

	return rendererConfigured;

}

module.exports = exports = responseRenderer;
