var error = require('../error')

function MinFunction(parameters, body) {
  var hasReturnStatment = function(body) {
        var conditionals = [],
            returnFlag = false

        for(i in body.statements) {
            if (body.statements[i].constructor.name == "ReturnStatement") { 
                returnFlag = true
                break
            } else if (body.statements[i].constructor.name == "ConditionalStatement") {
                conditionals.push(body.statements[i])
            } else if (body.statements[i].body) {
                if (hasReturnStatment(body.statements[i].body)) {
                    returnFlag = true
                    break
                }
            }
        }

        if (returnFlag == false) {
            for(i in conditionals) {
                if (hasReturnStatment(conditionals[i].body) && 
                   (conditionals[i].elseBody && hasReturnStatment(conditionals[i].elseBody))) {
                    returnFlag = true
                    break
                }
            }
        }

        return returnFlag
      }

  this.parameters = parameters
  this.body = body

  if(!hasReturnStatment(this.body)) {
    error('Function does not have a return statement in all possible paths')
  }
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