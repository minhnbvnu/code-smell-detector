function getFromAllDeclarations(nodeTest, keywords) {
                            return useParent(node.parent, nodeTest, (decl) => {
                                var _a2;
                                return mapDefined((_a2 = tryCast(decl, canHaveSymbol)) == null ? void 0 : _a2.symbol.declarations, (d) => nodeTest(d) ? find(d.getChildren(sourceFile), (c) => contains(keywords, c.kind)) : void 0);
                            });
                        }