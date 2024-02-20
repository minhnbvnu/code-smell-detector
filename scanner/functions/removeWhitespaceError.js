function removeWhitespaceError(node) {
                const locStart = node.loc.start;
                const locEnd = node.loc.end;
                errors = errors.filter(({ loc: { start: errorLocStart } }) => (errorLocStart.line < locStart.line ||
                    errorLocStart.line === locStart.line && errorLocStart.column < locStart.column ||
                    errorLocStart.line === locEnd.line && errorLocStart.column >= locEnd.column ||
                    errorLocStart.line > locEnd.line));
            }