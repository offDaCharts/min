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
  while (at(['?',':','\'','`','@','%',':?','_',';','#','$'])) {
    console.log(tokens[0].kind)
    statements.push(parseStatement())
    at('DEDENT') ? match('DEDENT') : match('NEWLINE')
  }
  
  if (at(['DEDENT', 'EOF'])) { //DEDENT or eof expected to end a block
    //if (at('DEDENT')) match('DEDENT')
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
  if (decType==='#') {
    parseNumber()
  } else if (decType==='$') {
    parseString()
  }
  //return new VariableDeclaration(id, type)
  //TODO function decs and class decs
}

function parseAssignmentStatement() {
  //var target = new VariableReference(match('ID'))
  match('ID')
  if (at(['=','+=','-=','*=','/=']))
    match()
  var source = parseExpression()
  //return new AssignmentStatement(target, source)
}

function parseBody() {
  match('BLOCK')
  match('INDENT')
  return parseBlock()
}

function parseConditional() {
  var conditional = match().kind
  if (conditional == '?' || conditional == ':')
      condition = parseExpression()

  body = parseBody()
  //return new ConditionalStatement(condition, body)
}

function parseLoop() {
  var loopType = match().kind

  if (loopType == '%') { //for loop
    var declaration = parseDeclaration()
    match(',')
    var condition = parseExpression()
    match(',')
    var assignment = parseAssignmentStatement(),
        body = parseBody()
    //return new ForStatement(condition, body)
  } else { //while
    var condition = parseExpression(),
        body = parseBody()
    //return new WhileStatement(condition, body)
  }  
}

function parsePrint() {
  match('\'')
  parseString()
}

function parseReturn() {
  return
}

function parseNumber() {
  match('NUMLIT') //TODO also accept expressions
}

function parseString() {
  var left = match('STRLIT')
  while (at(' ')) {
    var op = match()
    var right = parseString()
    left = new StringLiteral(op, left, right)

  }
  return left
}

function parseExpression() {
  var left = parseExp1()
  while (at(['|','&'])) {
    var op = match()
    var right = parseExp1()
    //left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp1() {
  var left = parseExp2()
  if (at(['~','~>','<~','<','>'])) {
    var op = match()
    var right = parseExp3()
    //left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp2() {
  var left = parseExp3()
  while (at(['+','-'])) {
    var op = match()
    var right = parseExp4()
    //left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp3() {
  var left = parseExp4()
  while (at(['*','/'])) {
    var op = match()
    var right = parseExp5()
    //left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp4() {
  if (at('-')) {
    var op = match()
    operand = parseExp5()
    return new UnaryExpression(op, operand)
  } else {
    return parseExp5()
  }
}

function parseExp5() {
  var left = parseExp6()
  if (at('!')) {
    var op = match()
    return new UnaryExpression(op, left)
  } else {
    return left
  }
}

function parseExp6() {
  if (at('NUMLIT')) {
      match()
      //return new IntegerLiteral(match())
  } else if (at('ID')) {
      match()
      //return new VariableReference(match())
  } else if (at('(')) {
      match()
      var expression = parseExpression()
      match(')')
      return expression
  }
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