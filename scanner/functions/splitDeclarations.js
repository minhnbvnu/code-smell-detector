function splitDeclarations(declaration) {
                const { parent } = declaration;
                // don't autofix code such as: if (foo) var x, y;
                if (!isInStatementList(parent.type === "ExportNamedDeclaration" ? parent : declaration)) {
                    return null;
                }
                return fixer => declaration.declarations.map(declarator => {
                    const tokenAfterDeclarator = sourceCode.getTokenAfter(declarator);
                    if (tokenAfterDeclarator === null) {
                        return null;
                    }
                    const afterComma = sourceCode.getTokenAfter(tokenAfterDeclarator, { includeComments: true });
                    if (tokenAfterDeclarator.value !== ",") {
                        return null;
                    }
                    const exportPlacement = declaration.parent.type === "ExportNamedDeclaration" ? "export " : "";
                    /*
                     * `var x,y`
                     * tokenAfterDeclarator ^^ afterComma
                     */
                    if (afterComma.range[0] === tokenAfterDeclarator.range[1]) {
                        return fixer.replaceText(tokenAfterDeclarator, `; ${exportPlacement}${declaration.kind} `);
                    }
                    /*
                     * `var x,
                     * tokenAfterDeclarator ^
                     *      y`
                     *      ^ afterComma
                     */
                    if (afterComma.loc.start.line > tokenAfterDeclarator.loc.end.line ||
                        afterComma.type === "Line" ||
                        afterComma.type === "Block") {
                        let lastComment = afterComma;
                        while (lastComment.type === "Line" || lastComment.type === "Block") {
                            lastComment = sourceCode.getTokenAfter(lastComment, { includeComments: true });
                        }
                        return fixer.replaceTextRange([tokenAfterDeclarator.range[0], lastComment.range[0]], `;${sourceCode.text.slice(tokenAfterDeclarator.range[1], lastComment.range[0])}${exportPlacement}${declaration.kind} `);
                    }
                    return fixer.replaceText(tokenAfterDeclarator, `; ${exportPlacement}${declaration.kind}`);
                }).filter(x => x);
            }