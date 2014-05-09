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
        linenumber = 0,
        indentStack = [0]
    baseStream.on('error', function (err) {error(err)})

    stream.on('readable', function () {
        scan(stream.read(), ++linenumber, tokens, indentStack)
    })
    stream.once('end', function () {
        while(indentStack.length > 1) {
            indentStack.pop()
            tokens.push({kind: 'DEDENT', lexeme: 'DEDENT'})
        }

        tokens.push({kind: 'EOF', lexeme: 'EOF'})
        callback(tokens)
    })
}

function scan(line, linenumber, tokens, indentStack) {
    //Skip if empty other than spaces
    if (!line.trim()) return

    var start, pos = 0,
        emit = function(kind, lexeme) {
            tokens.push({kind: kind, lexeme: lexeme || kind, line: linenumber, col: start+1})
        },
        block = false,
        numTabs, i

    while (true) {
        //Check for whitespace indent/dedent at beginning of line
        if (pos == 0) {
            start = pos
            while (/\s/.test(line[pos])) pos++
            numTabs = Math.floor(pos/4)

            // Nothing on the line- don't indent and dedent for blank lines
            if (pos >= line.length) break

            if (numTabs > indentStack[indentStack.length-1]) {
                if (numTabs > indentStack[indentStack.length-1]+1) {
                    error('Multiple INDENT tokens in 1 line', {line: linenumber, col: pos+1})
                } else {
                    indentStack.push(numTabs)
                    emit("INDENT")
                }
            } else if (numTabs < indentStack[indentStack.length-1]) {
                while (numTabs < indentStack[indentStack.length-1]) {
                    indentStack.pop()
                    emit("DEDENT")
                }
            }
        }

        // Nothing left on the line
        if (pos >= line.length) {
            start++
            (block) ? emit("BLOCK") : emit("NEWLINE")
            block = false
            break
        }

        start = pos
        
        // Two-character tokens
        if (/<~|>~|'~|\+=|-=|\*=|\/=|:\?/.test(line.substring(pos, pos+2))) {
            emit(line.substring(pos, pos+2))
            if (/:\?/.test(line.substring(pos, pos+2))) block = true
            pos += 2


        // One-char declarators [#$_;]
        // One-char operator [*^\-+\/!&|\s<>=]
        // Reserved chars [?:%@`]
        } else if (/[#$_;*\^\-+\/!&|\s<>=?:%@\`,()\[\]\{\}~\']/.test(line[pos])) {
            if (/[@%:?_]/.test(line[pos])) block = true
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
            if (/\./.test(line[pos])) {
                pos++
                while (/\d/.test(line[pos])) pos++
            }
            emit('NUMLIT', line.substring(start, pos))

        // Identifiers
        } else if (/[A-Za-z]/.test(line[pos])) {
            while (/[^#$_;*\^\-+\/!&|\s<>?:%@=`,()\[\]\{\}~"']/.test(line[pos]) && pos < line.length) pos++
            emit("ID", line.substring(start, pos))
        
        } else {
          error('Illegal character: ' + line[pos], {line: linenumber, col: pos+1})
          pos++
        }
    }
}
