'use strict';

var _ = require('underscore');
var path = require('path');
var responseRenderer = require('./response-renderer');
var actions = require('./actions');


function dispatch(options) {

	return function (controllerName, actionName) {

		/**
		 * @param {Request} req
		 * @param {Response} res
		 */
		return function (req, res) {
			req.actionName = actionName;
			req.controllerName = controllerName;
			var action, controllerPath = path.join(options.root, controllerName);

			if (!options.root) {
				action = actions.rootNotSet;
			} else {
				try {
					action = require(controllerPath)[actionName] || actions.noAction;
				} catch (error) {
					res.exception = error;
					action = actions.noController;
				}
			}

			try {
				return action(req, responseRenderer(options)(req, res));
			} catch (error) {
				res.exception = error;
				return actions.exception(req, responseRenderer(options)(req, res));
			}
		};
	};
}


module.exports = exports = dispatch;
