"use strict";

var errors = require('./errors');

function noController(req, next) {
	next(new errors.ControllerNotFoundError(['Controller not found:', req.controllerName].join(' ')));
}

function noAction(req, next) {
	next(new errors.ActionNotFoundError(['Action not found:', req.actionName].join(' ')));
}

function rootNotSet(req, next) {
	next(new errors.DispatcherError('Root not set'));
}

function exception(req, next) {
	next(new errors.DispatcherError('Application Error'));
}

exports.noController = noController;
exports.noAction = noAction;
exports.rootNotSet = rootNotSet;
exports.exception = exception;
