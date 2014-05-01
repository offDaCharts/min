function FunctionCall(id, parameters) {
  this.id = id
  this.parameters = parameters
}

FunctionCall.prototype.toString = function () {
  return '(Call: ' + id.lexeme + ' (' + this.parameters.join(',') + '))'
}

FunctionCall.prototype.analyze = function (context) {
  //context.variableMustNotBeAlreadyDeclared(this.id)
  //context.addVariable(this.id.lexeme, this)
}

module.exports = FunctionCall