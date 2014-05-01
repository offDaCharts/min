function MinFunction(parameters, body) {
  this.parameters = parameters
  this.body = body
}

MinFunction.prototype.toString = function () {
  return '(' + this.parameters.join(',') + ')' + this.body + ')'
}

MinFunction.prototype.analyze = function (context) {
  //context.variableMustNotBeAlreadyDeclared(this.id)
  //context.addVariable(this.id.lexeme, this)
}

module.exports = MinFunction