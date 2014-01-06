var _ = require('underscore');
var errors = require('./lib/errors');
var router = require('./lib/router');
var http = require('./lib/http');
var Dispatcher = require('./lib/dispatcher');


var defaults = {
	root: null,
	renderer: null,
	jsonp: '__jsonp',
	noError: '__noError',
	defaultController: 'index',
	defaultAction: 'index'
};


function configure(_options) {
	var options = _.defaults(_options, defaults);
	
	
	
	
	
	
	return {
		route: route,
		defaultRoute: defaultRoute
	};
	
//exports.errors = errors;
//exports.route = route;
//exports.defaultRoute = defaultRoute;
//exports.http = require('./http');
}

configure.http = http;
configure.errors = errors;


module.exports = exports = configure;
