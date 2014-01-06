'use strict';

/**
 * @type {{GET: string, POST: string, PUT: string, PATCH: string, DELETE: string, HEAD: string, OPTIONS: string}}
 */
var methods = {
	'GET': 'GET',
	'POST': 'POST',
	'PUT': 'PUT',
	'PATCH': 'PATCH',
	'DELETE': 'DELETE',
	'HEAD': 'HEAD',
	'OPTIONS': 'OPTIONS'
};


/**
 * @param {Request} req
 * @param {String} method
 * @returns {Boolean}
 */
function is(req, method) {
	var requestMethod = req.param('method') && req.param('method').toUpperCase() || req.method.toUpperCase();
	return methods[requestMethod] && methods[requestMethod] === method || methods[req.method.toUpperCase()] === method;
}


/**
 * @param {Request} req
 * @returns {Boolean}
 */
function isGet(req) {
	return is(req, methods.GET);
}


/**
 * @param {Request} req
 * @returns {Boolean}
 */
function isPost(req) {
	return is(req, methods.POST);
}


/**
 * @param {Request} req
 * @returns {Boolean}
 */
function isPut(req) {
	return is(req, methods.PUT);
}


/**
 * @param {Request} req
 * @returns {Boolean}
 */
function isPatch(req) {
	return is(req, methods.PATCH);
}


/**
 * @param {Request} req
 * @returns {Boolean}
 */
function isDelete(req) {
	return is(req, methods.DELETE);
}


/**
 * @param {Request} req
 * @returns {Boolean}
 */
function isHead(req) {
	return is(req, methods.HEAD);
}


/**
 * @param {Request} req
 * @returns {Boolean}
 */


/**
 * @param req
 * @returns {Boolean}
 */
function isOptions(req) {
	return is(req, methods.OPTIONS);
}


exports.is = is;
exports.isGet = isGet;
exports.isPost = isPost;
exports.isPut = isPut;
exports.isPatch = isPatch;
exports.isDelete = isDelete;
exports.isHead = isHead;
exports.isOptions = isOptions;
