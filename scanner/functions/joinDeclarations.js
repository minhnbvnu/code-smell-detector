function joinDeclarations(declarations) {
                const declaration = declarations[0];
                const body = Array.isArray(declaration.parent.parent.body) ? declaration.parent.parent.body : [];
                const currentIndex = body.findIndex(node => node.range[0] === declaration.parent.range[0]);
                const previousNode = body[currentIndex - 1];
                return fixer => {
                    const type = sourceCode.getTokenBefore(declaration);
                    const prevSemi = sourceCode.getTokenBefore(type);
                    const res = [];
                    if (previousNode && previousNode.kind === sourceCode.getText(type)) {
                        if (prevSemi.value === ";") {
                            res.push(fixer.replaceText(prevSemi, ","));
                        }
                        else {
                            res.push(fixer.insertTextAfter(prevSemi, ","));
                        }
                        res.push(fixer.replaceText(type, ""));
                    }
                    return res;
                };
            }