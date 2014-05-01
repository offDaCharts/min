function Function(parameters, body) {
  this.parameters = parameters
  this.body = body
}

Function.prototype.toString = function () {
  console.log(this.parameters)
  return '(' + this.parameters.join(',') + ')' + this.body + ')'
}

Function.prototype.analyze = function (context) {
  //context.variableMustNotBeAlreadyDeclared(this.id)
  //context.addVariable(this.id.lexeme, this)
}

module.exports = Function