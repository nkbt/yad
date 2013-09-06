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
 * @param {ExpressServerRequest} req
 * @param {String} method
 * @returns bool
 */
function is(req, method) {
	return methods[method] === req.method.toUpperCase();
}


/**
 * @param {ExpressServerRequest} req
 * @returns bool
 */
function isGet(req) {
	return is(req, methods.GET);
}

/**
 * @param {ExpressServerRequest} req
 * @returns bool
 */
function isPost(req) {
	return is(req, methods.POST);
}


/**
 * @param {ExpressServerRequest} req
 * @returns bool
 */
function isPut(req) {
	return is(req, methods.PUT);
}


/**
 * @param {ExpressServerRequest} req
 * @returns bool
 */
function isPatch(req) {
	return is(req, methods.PATCH);
}


/**
 * @param {ExpressServerRequest} req
 * @returns bool
 */
function isDelete(req) {
	return is(req, methods.DELETE);
}


/**
 * @param {ExpressServerRequest} req
 * @returns bool
 */
function isHead(req) {
	return is(req, methods.HEAD);
}


/**
 * @param {ExpressServerRequest} req
 * @returns bool
 */
function isOptions(req) {
	return is(req, methods.OPTIONS);
}


exports.methods = methods;
exports.is = is;
exports.isGet = isGet;
exports.isPost = isPost;
exports.isPut = isPut;
exports.isPatch = isPatch;
exports.isDelete = isDelete;
exports.isHead = isHead;
exports.isOptions = isOptions;
