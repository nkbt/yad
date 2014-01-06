"use strict";

var _ = require('underscore');
var errors = require('./lib/errors');
var http = require('./lib/http');
var auto = require('./lib/auto');
var dispatch = require('./lib/dispatch');


var defaults = {
	root: null,
	renderer: null,
	jsonp: '__jsonp',
	noError: '__noError',
	defaultController: 'index',
	defaultAction: 'index'
};


function dispatcher(_options) {
	var options = _.defaults(_options, defaults);

	return {
		auto: auto(options),
		dispatch: dispatch(options)
	};
}



module.exports = exports = dispatcher;
exports.http = http;
exports.errors = errors;
