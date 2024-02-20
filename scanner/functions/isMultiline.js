function isMultiline(node) {
                const last = getLastItem(node);
                const lastToken = sourceCode.getLastToken(node);
                return (last === null || last === void 0 ? void 0 : last.loc.end.line) !== (lastToken === null || lastToken === void 0 ? void 0 : lastToken.loc.end.line);
            }