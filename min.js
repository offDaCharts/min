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
var parse = require('./parser')
// TODO
// var generate = require('./generator')(argv.target)
var error = require('./error')

scan(argv._[0], function (tokens) {
  if (error.count > 0) return;
  if (argv.t) {
    tokens.forEach(function (t) {console.log(t)})
    return
  }
  var program = parse(tokens)
  if (error.count > 0) return;
  if (argv.a) {
    console.log(program.toString())
    return
  }
  //if (error.count > 0) return;
  //TODO generator and stuff
})

