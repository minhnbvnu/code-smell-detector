function computeLineAndCharacterOfPosition(lineStarts, position) {
            const lineNumber = computeLineOfPosition(lineStarts, position);
            return {
                line: lineNumber,
                character: position - lineStarts[lineNumber]
            };
        }