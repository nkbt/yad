"use strict";

var buster = require('buster');
var assert = buster.assert;

buster.testCase("Dispatch", {

	setUp: function () {
		this.test = 1;
	},

	"'test' should be equal to 1": function () {
		assert.equals(this.test, 1);
	}

});
