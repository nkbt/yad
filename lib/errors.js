'use strict';

var util = require('util');

var AbstractError = function (msg, constructor) {
	Error.captureStackTrace(this, constructor || this);
	this.message = msg || 'Error';
};
util.inherits(AbstractError, Error);
AbstractError.prototype.name = 'Dispatcher Error';


var DispatcherError = function (msg) {
	DispatcherError.super_.call(this, msg, this.constructor);
};
util.inherits(DispatcherError, AbstractError);
DispatcherError.prototype.message = 'Dispatcher Error';


var ControllerNotFoundError = function (msg) {
	ControllerNotFoundError.super_.call(this, msg, this.constructor);
};
util.inherits(ControllerNotFoundError, AbstractError);
ControllerNotFoundError.prototype.message = 'Controller not found';


var ActionNotFoundError = function (msg) {
	ActionNotFoundError.super_.call(this, msg, this.constructor);
};
util.inherits(ActionNotFoundError, AbstractError);
ActionNotFoundError.prototype.message = 'Action not found';


var NotFoundError = function (msg) {
	NotFoundError.super_.call(this, msg, this.constructor);
};
util.inherits(NotFoundError, AbstractError);
NotFoundError.prototype.message = 'Not found';


exports.DispatcherError = DispatcherError;
exports.ControllerNotFoundError = ControllerNotFoundError;
exports.ActionNotFoundError = ActionNotFoundError;
exports.NotFoundError = NotFoundError;