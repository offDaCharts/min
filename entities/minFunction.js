function MinFunction(parameters, body) {
  this.parameters = parameters
  this.body = body
}

MinFunction.prototype.toString = function () {
  return '(' + this.parameters.join(',') + ')' + this.body + ')'
}

MinFunction.prototype.analyze = function (context) {
  var localContext = context.createChildContext()
      hasReturnStatment = function(body) {
        
      }


  this.parameters.forEach(function (parameter) {
    localContext.addVariable(parameter.id.lexeme, parameter)
  })
  this.body.analyze(localContext)

  for (i in body.statements) {
    console.log(body.statements[i].constructor.name)
  }
  console.log(body)
}

module.exports = MinFunction