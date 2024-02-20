function processBlock(lineArray, startLineIndex, inFunction, internalMode, stringProtectionMap) {
    
    // Indentation of the previous block. Only used for indentation
    // error checking. The previous line kicked off processing of this
    // block, so it must have code on it.
    let prevBlockIndent = startLineIndex < 1 ? 0 :
        lineArray[startLineIndex - 1].search(/\S/);
    
    // Indentation index of the previous line, indentation index of
    // the block start
    let prevIndent, originalIndent;

    // Current line index
    let i;
    for (i = startLineIndex; i < lineArray.length; ++i) {
        // Trim right whitespace
        lineArray[i] = lineArray[i].rtrim();
        let indent = lineArray[i].search(/\S/);
        
        // Ignore empty lines
        if (indent < 0) { continue; }

        if (prevIndent === undefined) {
            // Initialize on the first non-empty line
            prevIndent = indent;
            originalIndent = indent;
        }

        // Has the block ended?
        if (indent < originalIndent) {
            // Indentation must not be more than the previous block, because
            // otherwise there would be inconsistent indentation
            if (indent > prevBlockIndent) { throw makeError('Inconsistent indentation', i); }
            return i;
        }
        
        // Colors in hex format
        lineArray[i] = replaceHexColors(lineArray[i]);

        // Check for some illegal situations while we're processing
        testForIllegalSyntax(lineArray[i], i, indent, internalMode);

        // See if the next non-empty line is not indented more than this one
        let singleLine = true;
        for (let j = i + 1; j < lineArray.length; ++j) {
            let nextIndent = lineArray[j].search(/\S/);
            if (nextIndent >= 0) {
                singleLine = (nextIndent <= indent);
                break;
            }
        }

        // Note the assignment to variable `match` in the IF statement tests below
        let match;
        if (singleLine) {
            try {
                lineArray[i] = processLine(lineArray[i], inFunction, stringProtectionMap);
            } catch (e) {
                throw makeError(e, i);
            }
            
        } else if (match = lineArray[i].match(RegExp('^(\\s*)def\\s+(\\$?' + identifierPattern + ')\\s*\\((.*)\\)[ \t]*([a-zA-Z_]*)[ \t]*:\\s*$'))) {
            // DEF
            let prefix = match[1], name = match[2], args = match[3] || '', modifier = match[4] || '';
            let end = processBlock(lineArray, i + 1, true, internalMode, stringProtectionMap) - 1;

            // Rewrite args for default values
            args = processDefaultArgSyntax(args);
            
            lineArray[i] = prefix + 'const ' + name + ' = (function(' + args + ') { ';
            if (modifier === 'preserving_transform') {
                lineArray[i] += 'try { $pushGraphicsState();';
            } else if (modifier !== '') {
                throw makeError('Illegal function modifier: ' + modifier, i);
            }
            i = end;

            if (modifier === 'preserving_transform') {
                lineArray[i] += '} finally { $popGraphicsState(); }';
            }
            lineArray[i] += '});';
            
        } else if (match = lineArray[i].match(/^(\s*)with\s+\(?(.+∊.+)\)?[ \t]*:[ \t]*$/)) {
            // WITH
            
            let prefix = match[1];
            let result;
            try {
                result = processWithHeader(match[2]);
            } catch (e) {
                throw makeError(e, i);
            }
            lineArray[i] = prefix + result[0];
            i = processBlock(lineArray, i + 1, inFunction, internalMode, stringProtectionMap) - 1;
            lineArray[i] += result[1];

        } else if (match = lineArray[i].match(/^(\s*)local[ \t]*:[ \t]*$/)) {
            // LOCAL
            
            let prefix = match[1];
            lineArray[i] = prefix + '{';
            i = processBlock(lineArray, i + 1, inFunction, internalMode, stringProtectionMap) - 1;
            lineArray[i] += '}';

        } else if (match = lineArray[i].match(/^(\s*)preserving_transform[ \t]*:[ \t]*$/)) {
            // PRESERVING TRANSFORM
            
            let prefix = match[1];
            lineArray[i] = prefix + 'try { $pushGraphicsState()';
            i = processBlock(lineArray, i + 1, inFunction, internalMode, stringProtectionMap) - 1;
            lineArray[i] += '} finally { $popGraphicsState(); }';

        } else if (match = lineArray[i].match(/^(\s*)for\s*(\b[^:]+)[ \t]*:[ \t]*$/)) {
            // FOR
            let prefix = match[1];
            let test = match[2];
            let forPart;
            try {
                forPart = processForTest(test);
            } catch (e) {
                throw makeError(e, i);
            }
            lineArray[i] = prefix + forPart[0];
            i = processBlock(lineArray, i + 1, inFunction, internalMode, stringProtectionMap) - 1;
            lineArray[i] += forPart[1];
            
        } else if (match = lineArray[i].match(/^(\s*)(if|else[\t ]+if)(\b.*):\s*$/)) {
            // IF, ELSE IF

            let old = i;
            lineArray[i] = match[1] + (/^\s*else[\t ]+if/.test(match[2]) ? 'else ' : '') + 'if (' + match[3].trim() + ') {';
            i = processBlock(lineArray, i + 1, inFunction, internalMode, stringProtectionMap) - 1;
            lineArray[i] += '}';
            
        } else if (match = lineArray[i].match(/^(\s*else)\s*:\s*$/)) {
            // ELSE
            
            lineArray[i] = match[1] + ' {';
            i = processBlock(lineArray, i + 1, inFunction, internalMode, stringProtectionMap) - 1;
            lineArray[i] += '}';
            
        } else if (match = lineArray[i].match(/^(\s*)(while|until)(\b.*)\s*:\s*$/)) {
            // WHILE/UNTIL
            
            let test = match[3];
            if (match[2] === 'until') {
                test = '! (' + test + ')';
            }

            lineArray[i] = match[1] + 'while (' + test + ') { ';
            i = processBlock(lineArray, i + 1, inFunction, internalMode, stringProtectionMap) - 1;
            lineArray[i] += '}';

        } else {
            throw makeError('Illegal block statement', i);
        }

        prevIndent = indent;
    } // for each line
    
    return i;
}