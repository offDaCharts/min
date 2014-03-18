var error = require('../error')

var cache = {}

function Type(name) {
  this.name = name
  cache[name] = this
}

Type.prototype.toString = function () {
  return this.name
}

exports.STRING = Type.STRING = new Type('string')
exports.INT = Type.INT = new Type('int')
exports.forName = function (name) {return cache[name]}

Type.prototype.mustBeInteger = function (message, location) {
  if (this !== Type.INT) {
    error(message, location)
  }
}

Type.prototype.mustBeString = function (message, location) {
  if (this !== Type.STRING) {
    error(message, location)
  }
}

Type.prototype.isCompatibleWith = function (otherType) {
  // In more sophisticated languages, comapatibility would be more complex
  return this == otherType;  
}

Type.prototype.mustBeCompatibleWith = function (otherType, message, location) {
  if (! this.isCompatibleWith(otherType)) {
    error(message, location)
  }
}
