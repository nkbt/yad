"use strict";

var _ = require('underscore');
var router = require('./router');
var responseRenderer = require('./response-renderer');
var errors = require('./errors');
var dispatch = require('./dispatch');
var actions = require('./actions');


function auto(options) {

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	return function autoDispatch(req, res) {

		return router(options)(req, function routeMatched(error, controllerName, actionName) {
			if (error) {
				res.exception = error;
				return actions.exception(req, responseRenderer(options, req, res));
			}
			return dispatch(options)(controllerName, actionName)(req, res);
		});
	};
}

module.exports = exports = auto;
