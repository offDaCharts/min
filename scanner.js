/*
 * Scanner module
 *
 *   var scan = require('./scanner')
 *
 *   scan(filename, function (tokens) {processTheTokens(tokens)})
 */

var fs = require('fs')
var byline = require('byline')
var error = require('./error')

module.exports = function (filename, callback) {
    var baseStream = fs.createReadStream(filename, {encoding: 'utf8'}),
        stream = byline(baseStream, {keepEmptyLines: true}),
        tokens = [],
        linenumber = 0
    baseStream.on('error', function (err) {error(err)})

    stream.on('readable', function () {
        scan(stream.read(), ++linenumber, tokens)
    })
    stream.once('end', function () {
        tokens.push({kind: 'EOF', lexeme: 'EOF'})
        callback(tokens)
    })
}

function scan(line, linenumber, tokens) {
    //Skip if empty other than spaces
    if (!line.trim()) return

    var start, pos = 0,
        emit = function(kind, lexeme) {
            tokens.push({kind: kind, lexeme: lexeme || kind, line: linenumber, col: start+1})
        }

    //dynamic whitespacing for indents
    while (true) {
        start = pos

        // Nothing on the line
        if (pos >= line.length) break
        
        if (/\s{4}/.test(line.substring(pos, pos+4))) {
            emit("tab", "    ")
            pos += 4
        
        // Two-character tokens
        } else if (/<~|>~|'=/.test(line.substring(pos, pos+2))) {
            emit(line.substring(pos, pos+2))
            pos += 2


        // One-char declarators [#$_;]
        // One-char operator [*^\-+\/!&|\s<>=]
        // Reserved chars [?:%@`]
        } else if (/[#$_;*\^\-+\/!&|\s<>=?:%@`]/.test(line[pos])) {
            emit(line[pos++])

        // String literals 
        } else if (/"/.test(line[pos])) {
            pos++
            while (/[^"]/.test(line[pos]) && pos < line.length) pos++
            if (/"/.test(line[pos++]))
                emit("STRLIT", line.substring(start, pos))
            else {
                error('Expected ": ' + line[pos], {line: linenumber, col: pos})
            }

        // Numeric literals
        } else if (/\d/.test(line[pos])) {
            while (/\d/.test(line[pos])) pos++
            if (/\./.test(line[pos+1])) {
                pos++
                while (/\d/.test(line[pos])) pos++
            }
            emit('NUMLIT', line.substring(start, pos))

        // Identifiers
        } else if (/[A-Za-z]/.test(line[pos])) {
            while (/[^#$_;*\^\-+\/!&|\s<>?:%@=`]/.test(line[pos]) && pos < line.length) pos++
            emit("ID", line.substring(start, pos))
        
        } else {
          error('Illegal character: ' + line[pos], {line: linenumber, col: pos+1})
          pos++
        }
    }
}
