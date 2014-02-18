#!/usr/bin/env node

var argv = require('optimist')
  .usage('$0 [-t] [-a] [-o] [-i] filename')
  .boolean(['t','a','o','i'])
  .describe('t', 'show tokens after scanning then stop')
  .describe('a', 'show abstract syntax tree after parsing then stop')
  .describe('o', 'do optimizations')
  .describe('i', 'generate and show the intermediate code then stop')
  .demand(1)
  .argv

var scan = require('./scanner')
// TODO
// var parse = require('./parser')
// var generate = require('./generator')(argv.target)
// var error = require('./error')

scan(argv._[0], function (tokens) {
  //if (error.count > 0) return;
  if (argv.t) {
    tokens.forEach(function (t) {console.log(t)})
    return
  }
  //TODO add parser and generator
})
