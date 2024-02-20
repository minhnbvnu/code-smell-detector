function saveStateAndInvoke(node, f) {
                const savedCurrentScope = currentLexicalScope;
                const savedCurrentScopeFirstDeclarationsOfName = currentScopeFirstDeclarationsOfName;
                const savedCurrentClassHasParameterProperties = currentClassHasParameterProperties;
                onBeforeVisitNode(node);
                const visited = f(node);
                if (currentLexicalScope !== savedCurrentScope) {
                    currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName;
                }
                currentLexicalScope = savedCurrentScope;
                currentClassHasParameterProperties = savedCurrentClassHasParameterProperties;
                return visited;
            }