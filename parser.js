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
  
  if (at(['DEDENT', 'EOF'])) { //DEDENT or eof expected to end a block
    if (at('DEDENT')) match('DEDENT')
    return //new Block(statements)
  }
}

function parseStatement() {
  if (at(['#', '$', ';', '_'])) {
    return parseDeclaration()
  } else if (at(['?',':',':?'])) {
    return parseConditional()
  } else if (at(['@','%'])) {
    return parseLoop()
  } else if (at(['\''])) {
    return parsePrint()
  } else if (at(['`'])) {
    return parseReturn()
  }
}

function parseDeclaration() {
  var decType = match().kind
  match('ID')
  match('=')
  if (decType==='#') match('NUMLIT')
  if (decType==='$') match('STRLIT')
  //TODO function decs and class decs
}

function parseConditional() {
  return
}

function parseLoop() {
  return
}

function parsePrint() {
  return
}

function parseReturn() {
  return
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