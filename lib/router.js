"use strict";

/**
 * @module router
 */

/**
 * @private
 */
var _ = require('underscore');

/**
 * @param {ExpressServerRequest} req
 * @param {Function} callback
 * @returns {Function}
 */
exports.match = function (req, callback) {


	// Setting default controller/action route
	var requestParams = req.params,
		requestPath = requestParams.shift(),
		params = requestPath.split('/'),
		paramsSize = _.size(params),
		controllerName,
		actionName;


	/**
	 * "/"
	 */
	if (paramsSize === 2 && _.isEmpty(params[1])) {
		return callback(null, controllerName, actionName);
	}


	/**
	 * "/controller"
	 */
	if (paramsSize === 2) {
		controllerName = params[1] || controllerName;
		return callback(null, controllerName, actionName);
	}


	/**
	 * "/controller/action"
	 */
	if (paramsSize === 3) {
		controllerName = params[1] || controllerName;
		actionName = params[2] || actionName;
		return callback(null, controllerName, actionName);
	}


	return callback(new Error(["Incorrect route", requestPath].join(': ')));
};