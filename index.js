'use strict';

var chalk = require('chalk');
var table = require('text-table');
var ansiTrim = require('cli-color/lib/trim');

function getFormattedHeading(title) {
  return chalk.underline.white(title);
}

function getFormattedTitle(title) {
  return title;
}

function getFormattedGross(gross) {
  return chalk.blue(gross);
}

function print(output) {
  var textTableOptions = {
    stringLength: function (s) {
      return ansiTrim(s).length;
    }
  };

  if (process.env.NODE_ENV !== 'test') {
    console.log(table(output, textTableOptions));
    console.log();
  }
}

module.exports = function (movies) {
  if (!Array.isArray(movies)) {
    throw new Error('Parameter should be an array');
  }

  if (movies.length < 1) {
    throw new Error('Movies array should have one or more items');
  }

  var isAnyMovieIdInvalid = movies.some(function (movie) {
    return ({}).toString(movie) !== '[object Object]' ||
      (typeof movie.title === 'string' && movie.title.length < 5) ||
      (typeof movie.domesticGross !== 'number');
  });

  if (isAnyMovieIdInvalid) {
    throw new Error('Movies array should be valid');
  }

  var output = [[
    getFormattedHeading('Movie title'),
    getFormattedHeading('Domestic Gross')
  ]];

  movies.forEach(function (movie) {
    output.push([
      getFormattedTitle(movie.title),
      getFormattedGross(movie.domesticGross)
    ]);
  });

  print(output);
};
