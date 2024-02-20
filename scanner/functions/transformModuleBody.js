function transformModuleBody(node, namespaceLocalName) {
                const savedCurrentNamespaceContainerName = currentNamespaceContainerName;
                const savedCurrentNamespace = currentNamespace;
                const savedCurrentScopeFirstDeclarationsOfName = currentScopeFirstDeclarationsOfName;
                currentNamespaceContainerName = namespaceLocalName;
                currentNamespace = node;
                currentScopeFirstDeclarationsOfName = void 0;
                const statements = [];
                startLexicalEnvironment();
                let statementsLocation;
                let blockLocation;
                if (node.body) {
                    if (node.body.kind === 265 /* ModuleBlock */) {
                        saveStateAndInvoke(node.body, (body) => addRange(statements, visitNodes2(body.statements, namespaceElementVisitor, isStatement)));
                        statementsLocation = node.body.statements;
                        blockLocation = node.body;
                    }
                    else {
                        const result = visitModuleDeclaration(node.body);
                        if (result) {
                            if (isArray(result)) {
                                addRange(statements, result);
                            }
                            else {
                                statements.push(result);
                            }
                        }
                        const moduleBlock = getInnerMostModuleDeclarationFromDottedModule(node).body;
                        statementsLocation = moveRangePos(moduleBlock.statements, -1);
                    }
                }
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                currentNamespaceContainerName = savedCurrentNamespaceContainerName;
                currentNamespace = savedCurrentNamespace;
                currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName;
                const block = factory2.createBlock(setTextRange(factory2.createNodeArray(statements), 
                /*location*/
                statementsLocation), 
                /*multiLine*/
                true);
                setTextRange(block, blockLocation);
                if (!node.body || node.body.kind !== 265 /* ModuleBlock */) {
                    setEmitFlags(block, getEmitFlags(block) | 3072 /* NoComments */);
                }
                return block;
            }