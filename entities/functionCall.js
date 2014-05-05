function FunctionCall(id, parameters) {
  this.id = id
  this.parameters = parameters
}

FunctionCall.prototype.toString = function () {
  return '(Call: ' + id.lexeme + ' (' + this.parameters.join(',') + '))'
}

FunctionCall.prototype.analyze = function (context) {
  this.referent = context.lookupVariable(this.id.token)
  this.type = this.referent.type
}

module.exports = FunctionCall