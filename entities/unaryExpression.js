var Type = require('./type')

function UnaryExpression(op, operand) {
  this.op = op
  this.operand = operand
}

UnaryExpression.prototype.toString = function () {
  return '(' + this.op.lexeme + ' ' + this.operand + ')'
}

UnaryExpression.prototype.analyze = function (context) {
  this.operand.analyze(context)
  // if (this.op.lexeme === 'not') {
  //   this.operand.type.mustBeBoolean('The "not" operator requires a boolean operand', this.op)
  //   this.type = Type.BOOL
  // } else {
  //   // this.op.lexeme === '-'
  //   this.operand.type.mustBeNumber('The "negation" operator requires an number operand', this.op)
  //   this.type = Type.NUMBER
  // }
}

module.exports = UnaryExpression
