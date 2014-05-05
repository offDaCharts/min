function VariableDeclaration(id, type, assignment) {
  this.id = id
  this.type = type
  this.assignment = assignment
}

VariableDeclaration.prototype.toString = function () {
  var assignment = (this.assignment) ? ' (= ' + this.id.lexeme + ' ' + this.assignment + ')' : ''
  return '(Var :' + this.id.lexeme + ' ' + this.type + assignment +')'
}

VariableDeclaration.prototype.analyze = function (context) {
  context.variableMustNotBeAlreadyDeclared(this.id)
  this.assignment.analyze(context)
  context.addVariable(this.id.lexeme, this)
}

module.exports = VariableDeclaration
