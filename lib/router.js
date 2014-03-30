"use strict";

/**
 * @module router
 */

/**
 * @private
 */
var _ = require('underscore');


/**
 * @param {Request} req
 * @param {Function} callback
 */
module.exports = exports = function (options) {

	return function (req, callback) {

		// Setting default controller/action route
		var requestParams = req.params,
			requestPath = _.isArray(requestParams) && requestParams.shift() || '',
			params = requestPath.replace(/^\/+/, '').split('/'),
			paramsSize = _.size(params),
			controllerName = options.defaultController,
			actionName = options.defaultAction,
			error = null;


		if (paramsSize === 1) {

			// "/controller"
			controllerName = params[0] || controllerName;

		} else if (paramsSize === 2) {

			// "/controller/action"
			controllerName = params[0] || controllerName;
			actionName = params[1] || actionName;

		} else {

			error = new Error(["Incorrect route", requestPath].join(': '));

		}

		return callback(error, controllerName, actionName);
	};

};
