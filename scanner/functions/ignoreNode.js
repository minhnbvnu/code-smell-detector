function ignoreNode(node) {
                const unknownNodeTokens = new Set(sourceCode.getTokens(node, { includeComments: true }));
                unknownNodeTokens.forEach(token => {
                    if (!unknownNodeTokens.has(offsets.getFirstDependency(token))) {
                        const firstTokenOfLine = tokenInfo.getFirstTokenOfLine(token);
                        if (token === firstTokenOfLine) {
                            offsets.ignoreToken(token);
                        }
                        else {
                            offsets.setDesiredOffset(token, firstTokenOfLine, 0);
                        }
                    }
                });
            }