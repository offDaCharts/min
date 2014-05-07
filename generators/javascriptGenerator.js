var util = require('util')
var HashMap = require('hashmap').HashMap

module.exports = function (program) {
  programString = ""
  gen(program) 
  return programString 
}

var indentPadding = 4
var indentLevel = 0
var programString = ""

function emit(line) {
  var pad = indentPadding * indentLevel
  //console.log(Array(pad+1).join(' ') + line)
  programString += Array(pad+1).join(' ') + line + '\n'
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
    var initializer
    if(v.type.name === 'function' && v.assignment) {
      emit(util.format('var %s = function(%s) {', 
        makeVariable(v), 
        v.assignment.parameters.map(function(param) {return makeVariable(param)}).join(', ') ))
      gen(v.assignment.body)
      emit('}') 
    } else {
      if(v.assignment) {
        initializer = gen(v.assignment)
      } else {
        initializer = {'number': '0', 'string': '', 'function': 'null'}[v.type.name]
      }
      emit(util.format('var %s = %s;', makeVariable(v), initializer))
    }
  },

  'AssignmentStatement': function (s) {
    emit(util.format('%s %s %s', gen(s.target), s.assignment, gen(s.source)))
  },

  'ReturnStatement': function (s) {
    emit(util.format('return %s', gen(s.returnValue)))
  },

  'WriteStatement': function (s) {
    emit(util.format('alert(%s);', gen(s.writeValue)))
  },

  'FunctionCall': function (s) {
    emit(util.format('%s(%s)', gen(s.id), s.parameters.map(function(param) {return gen(param)}).join(', ') ))
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

  'ForStatement': function (s) {
    emit('for (')
    indentLevel++
    gen(s.declaration)
    emit(gen(s.condition) + ';')
    gen(s.assignment)
    indentLevel--
    emit(') {')
    gen(s.body)
    emit('}')
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
