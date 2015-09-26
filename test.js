'use strict';

var test = require('ava');
var defaultReporter = require('./');

process.env.NODE_ENV = 'test';

test('it should error if movies is not an array', function (t) {
  t.throws(function () { return defaultReporter(void 0); });
  t.throws(function () { return defaultReporter(null); });
  t.throws(function () { return defaultReporter(123); });
  t.throws(function () { return defaultReporter(false); });
  t.throws(function () { return defaultReporter('foo'); });
  t.throws(function () { return defaultReporter({}); });
  t.end();
});

test('it should error if movies is not a valid array', function (t) {
  t.throws(function () { return defaultReporter([]); });
  t.throws(function () { return defaultReporter([null]); });
  t.throws(function () { return defaultReporter([123]); });
  t.throws(function () { return defaultReporter([false]); });
  t.throws(function () { return defaultReporter(['foo']); });
  t.throws(function () { return defaultReporter([{}]); });
  t.throws(function () { return defaultReporter([{foo: 'bar'}]); });
  t.throws(function () { return defaultReporter([{title: 'bar'}]); });
  t.throws(function () { return defaultReporter([{title: 'bar.htm', foo: 0}]); });
  t.throws(function () { return defaultReporter([{title: 'bar.htm', domesticGross: 'foo'}]); });

  t.doesNotThrow(function () { return defaultReporter([{title: 'bar.htm', domesticGross: 0}]); });

  t.end();
});
