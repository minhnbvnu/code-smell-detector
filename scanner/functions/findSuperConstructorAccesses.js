function findSuperConstructorAccesses(classDeclaration, addNode) {
                        const constructor = getClassConstructorSymbol(classDeclaration.symbol);
                        if (!(constructor && constructor.declarations)) {
                            return;
                        }
                        for (const decl of constructor.declarations) {
                            Debug.assert(decl.kind === 173 /* Constructor */);
                            const body = decl.body;
                            if (body) {
                                forEachDescendantOfKind(body, 106 /* SuperKeyword */, (node) => {
                                    if (isCallExpressionTarget(node)) {
                                        addNode(node);
                                    }
                                });
                            }
                        }
                    }