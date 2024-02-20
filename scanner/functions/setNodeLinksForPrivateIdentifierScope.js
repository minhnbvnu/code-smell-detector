function setNodeLinksForPrivateIdentifierScope(node) {
                if (isPrivateIdentifier(node.name) && languageVersion < 99 /* ESNext */) {
                    for (let lexicalScope = getEnclosingBlockScopeContainer(node); !!lexicalScope; lexicalScope = getEnclosingBlockScopeContainer(lexicalScope)) {
                        getNodeLinks(lexicalScope).flags |= 4194304 /* ContainsClassWithPrivateIdentifiers */;
                    }
                    if (isClassExpression(node.parent)) {
                        const enclosingIterationStatement = getEnclosingIterationStatement(node.parent);
                        if (enclosingIterationStatement) {
                            getNodeLinks(node.name).flags |= 32768 /* BlockScopedBindingInLoop */;
                            getNodeLinks(enclosingIterationStatement).flags |= 4096 /* LoopWithCapturedBlockScopedBinding */;
                        }
                    }
                }
            }