var util = require('util')
var HashMap = require('hashmap').HashMap

module.exports = function (program) {
  gen(program)  
}

var indentPadding = 4
var indentLevel = 0

function emit(line) {
  var pad = indentPadding * indentLevel
  console.log(Array(pad+1).join(' ') + line)
}

function makeOp(op) {
  return {'&': '&&', '|': '||', '~': '===', '!=': '!=='}[op] || op
}

var makeVariable = (function () {
  var lastId = 0
  var map = new HashMap()
  return function (v) {
    if (!map.has(v)) map.set(v, ++lastId)
    return '_v' + map.get(v)
  }
}())

function gen(e) {
  //console.log("//" + e.constructor.name)
  return generator[e.constructor.name](e)
}

var generator = {

  'Program': function (program) {
    indentLevel = 0
    emit('(function () {')
    gen(program.block)
    emit('}());')
  },

  'Block': function (block) {
    indentLevel++
    block.statements.forEach(function (statement) {
      gen(statement)
    })
    indentLevel--
  },

  'VariableDeclaration': function (v) {
    var initializer = v.assignment.toString() || {'number': '0', 'string': 'false'}[v.type]
    emit(util.format('var %s = %s;', makeVariable(v), initializer))
  },

  'AssignmentStatement': function (s) {
    emit(util.format('%s = %s;', gen(s.target), gen(s.source)))
  },

  'ReadStatement': function (s) {
    s.varrefs.forEach(function (v) {
      emit(util.format('%s = prompt();', makeVariable(v.referent)))
    })
  },

  'WriteStatement': function (s) {
    emit(util.format('alert(%s);', gen(s.writeValue)))
  },

  'ConditionalStatement': function (s) {
    emit('if (' + gen(s.condition) + ') {')
    gen(s.body)
    emit('}')
    if (s.elseBody) {
      emit('else {')
      gen(s.elseBody)
      emit('}')
    }
  },

  'WhileStatement': function (s) {
    emit('while (' + gen(s.condition) + ') {')
    gen(s.body)
    emit('}')
  },

  'NumericLiteral': function (literal) {
    return literal.toString()
  },

  'StringLiteral': function (literal) {
    return literal.toString()
  },

  'VariableReference': function (v) {
    return makeVariable(v.referent)
  },

  'UnaryExpression': function (e) {
    return util.format('(%s %s)', makeOp(e.op.lexeme), gen(e.operand))
  },

  'BinaryExpression': function (e) {
    return util.format('(%s %s %s)', gen(e.left), makeOp(e.op.lexeme), gen(e.right))
  }
}
