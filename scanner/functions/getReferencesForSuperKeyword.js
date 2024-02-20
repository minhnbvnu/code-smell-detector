function getReferencesForSuperKeyword(superKeyword) {
                        let searchSpaceNode = getSuperContainer(superKeyword, 
                        /*stopOnFunctions*/
                        false);
                        if (!searchSpaceNode) {
                            return void 0;
                        }
                        let staticFlag = 32 /* Static */;
                        switch (searchSpaceNode.kind) {
                            case 169 /* PropertyDeclaration */:
                            case 168 /* PropertySignature */:
                            case 171 /* MethodDeclaration */:
                            case 170 /* MethodSignature */:
                            case 173 /* Constructor */:
                            case 174 /* GetAccessor */:
                            case 175 /* SetAccessor */:
                                staticFlag &= getSyntacticModifierFlags(searchSpaceNode);
                                searchSpaceNode = searchSpaceNode.parent;
                                break;
                            default:
                                return void 0;
                        }
                        const sourceFile = searchSpaceNode.getSourceFile();
                        const references = mapDefined(getPossibleSymbolReferenceNodes(sourceFile, "super", searchSpaceNode), (node) => {
                            if (node.kind !== 106 /* SuperKeyword */) {
                                return;
                            }
                            const container = getSuperContainer(node, 
                            /*stopOnFunctions*/
                            false);
                            return container && isStatic(container) === !!staticFlag && container.parent.symbol === searchSpaceNode.symbol ? nodeEntry(node) : void 0;
                        });
                        return [{ definition: { type: 0 /* Symbol */, symbol: searchSpaceNode.symbol }, references }];
                    }