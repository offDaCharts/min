function MinFunction(parameters, body) {
  this.parameters = parameters
  this.body = body
}

MinFunction.prototype.toString = function () {
  return '(' + this.parameters.join(',') + ')' + this.body + ')'
}

MinFunction.prototype.analyze = function (context) {
  var localContext = context.createChildContext()
  this.parameters.forEach(function (parameter) {
    localContext.addVariable(parameter.id.lexeme, parameter)
  })
  this.body.analyze(localContext)
}

module.exports = MinFunction