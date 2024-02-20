function getReferencesForThisKeyword(thisOrSuperKeyword, sourceFiles, cancellationToken) {
                        let searchSpaceNode = getThisContainer(thisOrSuperKeyword, 
                        /* includeArrowFunctions */
                        false, 
                        /*includeClassComputedPropertyName*/
                        false);
                        let staticFlag = 32 /* Static */;
                        switch (searchSpaceNode.kind) {
                            case 171 /* MethodDeclaration */:
                            case 170 /* MethodSignature */:
                                if (isObjectLiteralMethod(searchSpaceNode)) {
                                    staticFlag &= getSyntacticModifierFlags(searchSpaceNode);
                                    searchSpaceNode = searchSpaceNode.parent;
                                    break;
                                }
                            case 169 /* PropertyDeclaration */:
                            case 168 /* PropertySignature */:
                            case 173 /* Constructor */:
                            case 174 /* GetAccessor */:
                            case 175 /* SetAccessor */:
                                staticFlag &= getSyntacticModifierFlags(searchSpaceNode);
                                searchSpaceNode = searchSpaceNode.parent;
                                break;
                            case 308 /* SourceFile */:
                                if (isExternalModule(searchSpaceNode) || isParameterName(thisOrSuperKeyword)) {
                                    return void 0;
                                }
                            case 259 /* FunctionDeclaration */:
                            case 215 /* FunctionExpression */:
                                break;
                            default:
                                return void 0;
                        }
                        const references = flatMap(searchSpaceNode.kind === 308 /* SourceFile */ ? sourceFiles : [searchSpaceNode.getSourceFile()], (sourceFile) => {
                            cancellationToken.throwIfCancellationRequested();
                            return getPossibleSymbolReferenceNodes(sourceFile, "this", isSourceFile(searchSpaceNode) ? sourceFile : searchSpaceNode).filter((node) => {
                                if (!isThis(node)) {
                                    return false;
                                }
                                const container = getThisContainer(node, 
                                /* includeArrowFunctions */
                                false, 
                                /*includeClassComputedPropertyName*/
                                false);
                                if (!canHaveSymbol(container))
                                    return false;
                                switch (searchSpaceNode.kind) {
                                    case 215 /* FunctionExpression */:
                                    case 259 /* FunctionDeclaration */:
                                        return searchSpaceNode.symbol === container.symbol;
                                    case 171 /* MethodDeclaration */:
                                    case 170 /* MethodSignature */:
                                        return isObjectLiteralMethod(searchSpaceNode) && searchSpaceNode.symbol === container.symbol;
                                    case 228 /* ClassExpression */:
                                    case 260 /* ClassDeclaration */:
                                    case 207 /* ObjectLiteralExpression */:
                                        return container.parent && canHaveSymbol(container.parent) && searchSpaceNode.symbol === container.parent.symbol && isStatic(container) === !!staticFlag;
                                    case 308 /* SourceFile */:
                                        return container.kind === 308 /* SourceFile */ && !isExternalModule(container) && !isParameterName(node);
                                }
                            });
                        }).map((n) => nodeEntry(n));
                        const thisParameter = firstDefined(references, (r) => isParameter(r.node.parent) ? r.node : void 0);
                        return [{
                                definition: { type: 3 /* This */, node: thisParameter || thisOrSuperKeyword },
                                references
                            }];
                    }