"use strict";

var path = require('path');
var expect = require('chai').expect;
var yadFactory = require(path.join(__dirname, '..', 'index'));

describe('Yet Another Dispatcher', function () {
	var yad;


	beforeEach(function () {
		yad = yadFactory({
			root: path.join(__dirname, 'fixtures', 'controllers')
		});
	});


	it('should response to [auto, dispatch] instance methods', function () {
		expect(yad).to.respondTo('auto');
		expect(yad).to.respondTo('dispatch');
	});


	it('should have [http, errors] static properties', function () {
		expect(yadFactory).to.have.keys('http', 'errors');
	});

});
