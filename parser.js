/*
 * Parser module
 *
 *   var parse = require('./parser')
 *
 *   var program = parse(tokens)
 */

var scanner = require('./scanner')
var error = require('./error')

var Program = require('./entities/program')



var tokens

module.exports = function (scanner_output) {
  tokens = scanner_output
  var program = parseProgram()
  match('EOF')
  return program
}

function parseProgram() {
  return new Program(parseBlock())
}

function parseBlock() {
  var statements = []
  do {
    statements.push(parseStatement())
    match('NEWLINE')
  } while (at(['?',':','\'','`','@','%',':?','_',';','#','$']))
  return new Block(statements)
}


function at(symbol) {
  if (tokens.length === 0) {
    return false
  } else if (Array.isArray(symbol)) {
    return symbol.some(function (s) {return at(s)})
  } else {
    return symbol === tokens[0].kind
  }  
}

function match(symbol) {
  if (tokens.length === 0) {
    error('Unexpected end of input')
  } else if (symbol === undefined || symbol === tokens[0].kind) {
    return tokens.shift()
  } else {
    error('Expected ' + symbol + ' but found ' + tokens[0].kind, tokens[0])
  }
}