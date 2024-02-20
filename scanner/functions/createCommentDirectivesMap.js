function createCommentDirectivesMap(sourceFile, commentDirectives) {
            const directivesByLine = new Map(commentDirectives.map((commentDirective) => [
                `${getLineAndCharacterOfPosition(sourceFile, commentDirective.range.end).line}`,
                commentDirective
            ]));
            const usedLines = /* @__PURE__ */ new Map();
            return { getUnusedExpectations, markUsed };
            function getUnusedExpectations() {
                return arrayFrom(directivesByLine.entries()).filter(([line, directive]) => directive.type === 0 /* ExpectError */ && !usedLines.get(line)).map(([_, directive]) => directive);
            }
            function markUsed(line) {
                if (!directivesByLine.has(`${line}`)) {
                    return false;
                }
                usedLines.set(`${line}`, true);
                return true;
            }
        }