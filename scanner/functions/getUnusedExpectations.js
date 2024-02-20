function getUnusedExpectations() {
                return arrayFrom(directivesByLine.entries()).filter(([line, directive]) => directive.type === 0 /* ExpectError */ && !usedLines.get(line)).map(([_, directive]) => directive);
            }