function findOwnConstructorReferences(classSymbol, sourceFile, addNode) {
                        const constructorSymbol = getClassConstructorSymbol(classSymbol);
                        if (constructorSymbol && constructorSymbol.declarations) {
                            for (const decl of constructorSymbol.declarations) {
                                const ctrKeyword = findChildOfKind(decl, 135 /* ConstructorKeyword */, sourceFile);
                                Debug.assert(decl.kind === 173 /* Constructor */ && !!ctrKeyword);
                                addNode(ctrKeyword);
                            }
                        }
                        if (classSymbol.exports) {
                            classSymbol.exports.forEach((member) => {
                                const decl = member.valueDeclaration;
                                if (decl && decl.kind === 171 /* MethodDeclaration */) {
                                    const body = decl.body;
                                    if (body) {
                                        forEachDescendantOfKind(body, 108 /* ThisKeyword */, (thisKeyword) => {
                                            if (isNewExpressionTarget(thisKeyword)) {
                                                addNode(thisKeyword);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }