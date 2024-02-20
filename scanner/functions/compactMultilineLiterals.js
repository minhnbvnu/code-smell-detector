function compactMultilineLiterals(lineArray) {
    let i = 0;

    // Count across the current multi-line expression
    let count = Object.seal([0, 0, 0]);

    const BRACKET  = '()[]{}';

    while (i < lineArray.length) {
        // -1 when there is no current expression building
        let currentExprStartLine = -1;
        let multiLine = false;
        do {
            const line = lineArray[i];

            // Update the count for this line
            for (let j = 0; j < line.length; ++j) {
                let type = BRACKET.indexOf(line[j]);
                if (type > -1) {
                    // even indices are open brackets that increment,
                    // odds indices are close brackets that decrement.
                    count[type >> 1] += 1 - ((type & 1) << 1);
                }
            }

            // See if we're still unbalanced
            multiLine = false;
            for (let c = 0; c < 3; ++c) {
                if (count[c] < 0) {
                    throw makeError('Extra "' + BRACKET[2 * c + 1] + '", no expression to close', i);
                } else if (count[c] > 0) {
                    if (currentExprStartLine === -1) {
                        // Start a new expression
                        currentExprStartLine = i;
                    }
                    multiLine = true;
                }
            }

            const multiLineContinuesHere =   multiLine && (currentExprStartLine !== i);
            const multiLineEndsHere      = ! multiLine && (currentExprStartLine !== -1);

            if (multiLineEndsHere && (lineArray[i].indexOf(';') !== -1)) {
                throw makeError('";" not allowed on lines ending multi-line expressions.', i);
            }
                
            if (multiLineContinuesHere || multiLineEndsHere) {
                // move line i up to the expression start
                lineArray[currentExprStartLine] += ' ' + lineArray[i].trim();
                lineArray[i] = '';
            }

            if (i === lineArray.length - 1) {
                if (multiLineEndsHere) {
                    // Expression ended the entire program
                    return lineArray;
                } else if (multiLineContinuesHere) {
                    // Ran out of length!
                    console.error();
                    throw makeError('Expression not closed before the end of the file.', currentExprStartLine);
                }
            }
                
            ++i;
        } while (multiLine);
    } // while not at end

    i = lineArray.length - 1;
    while (i > 0) {
        const prev = lineArray[i - 1];
        if (prev.match(/,\s*$/)) {
            // Pull up onto previous line
            lineArray[i - 1] = prev.trimEnd() + ' ' + lineArray[i].trimStart();
            lineArray[i] = '';
        }
        --i;
    }  // while not at end


    return lineArray;
}