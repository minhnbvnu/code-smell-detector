function adjustedColumn(position) {
                const line = position.line - 1; // position.line is 1-indexed
                return util.getStringLength(at(sourceCode.lines, line).slice(0, position.column));
            }