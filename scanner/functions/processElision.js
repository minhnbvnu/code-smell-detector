function processElision(lineArray) {
    // Inserted to indent one level
    const indentString = '    ';

    // Scan bottom up so that recursive nesting works.  Multiply
    // elided blocks will be processed multiple times, but this simplifies
    // the logic.
    for (let i = lineArray.length - 1; i > 0; --i) {
        const match = lineArray[i].match(/^([\t ]*)\&[ \t]*(.*)/);
        if (match) {
            if (match[2].startsWith('else')) {
                throw makeError('Cannot elide else blocks using &', i);
            }
                
            // Scan upwards for the previous non-empty line
            let prevNonEmptyLine = i - 1;
            while (prevNonEmptyLine > 0 && lineArray[prevNonEmptyLine] === '') {
                --prevNonEmptyLine;
            }
            
            if (prevNonEmptyLine === -1) {
                throw makeError('Elided block using & with no previous block', i);
            }

            if (lineArray[prevNonEmptyLine].endsWith(':')) {
                throw makeError('Elided block using & to a block that already ends in :', prevNonEmptyLine);
            }
            
            lineArray[prevNonEmptyLine] += ':';

            if (lineArray[prevNonEmptyLine].search(/\S/) !== match[1].length) {
                throw makeError('Elided block must be at same indentation as parent', i);
            }

            // Remove the & and any leading space, and indent the elided line
            lineArray[i] = indentString + match[1] + match[2];
            const currentIndentLength = match[1].length;

            // Scan forward for the next line that is indented more,
            // indenting as we go. There should be no elision encountered
            // as we are processing the outer loop upwards
            
            for (let j = i + 1; j < lineArray.length; ++j) {
                const indentLength = lineArray[j].search(/\S/);
                
                // Check the indent level of this nonempty line
                if (indentLength > -1) {
                    console.assert(indentLength >= 0, 'Nonempty lines must have an indent');
                    console.assert(lineArray[j][indentLength] !== '&', 'Previous elision not removed');

                    // Indent
                    if (indentLength > currentIndentLength) {
                        lineArray[j] = indentString + lineArray[j];
                    }
                }
            } // for j
            
        } // match elision
    } // for each line

}