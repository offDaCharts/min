var Type = require('./type')
var error = require('../error')

function BinaryExpression(op, left, right) {
  this.op = op
  this.left = left
  this.right = right
}

BinaryExpression.prototype.analyze = function (context) {
  this.left.analyze(context)
  this.right.analyze(context)
  op = this.op.lexeme
  if (/<~?|>~?/.test(op)) {
    this.bothOperandsMustBe(Type.NUMBER)
    this.type = Type.NUMBER
  } else if (/~/.test(op)) {
    this.left.type.mustBeCompatibleWith(this.right.type, 'Operands of "' + op + '" must have same type', this.op)
    this.type = Type.NUMBER
  } else if (/&|\|/.test(op)) {
    this.bothOperandsMustBe(Type.NUMBER)
    this.type = Type.NUMBER
  } else {
    // All other binary operators are arithmetic
    this.bothOperandsMustBe(Type.NUMBER)
    this.type = Type.NUMBER
  }
}

BinaryExpression.prototype.toString = function () {
  return '(' + this.op.lexeme + ' ' + this.left + ' ' + this.right + ')'
}

BinaryExpression.prototype.bothOperandsMustBe = function (type) {
  console.log(this.left.type)
  console.log(this.right.type)
  if (type !== this.left.type || type !== this.right.type) {
    error('Operands to "' + this.op.lexeme + '" must both have type ' + type, this.op)
  }
}

BinaryExpression.prototype.assertCanBeComparedForEquality = function () {

}

module.exports = BinaryExpression
