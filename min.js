#!/usr/bin/env node

var argv = require('optimist')
  .usage('$0 [-t] [-a] [-i] filename')
  .boolean(['t','a','o','i'])
  .describe('t', 'show tokens after scanning then stop')
  .describe('a', 'show abstract syntax tree after parsing then stop')
  .describe('i', 'generate and show the intermediate code then stop')
  .demand(1)
  .argv

var scan = require('./scanner')
var parse = require('./parser')
var generate = require('./generator')()
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

  program.analyze()

  if (argv.i) {
    program.showSemanticGraph()
    return
  }

  if (error.count > 0) return;
  console.log(generate(program))
})

