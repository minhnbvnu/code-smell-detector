function onBeforeVisitNode(node) {
                switch (node.kind) {
                    case 308 /* SourceFile */:
                    case 266 /* CaseBlock */:
                    case 265 /* ModuleBlock */:
                    case 238 /* Block */:
                        currentLexicalScope = node;
                        currentScopeFirstDeclarationsOfName = void 0;
                        break;
                    case 260 /* ClassDeclaration */:
                    case 259 /* FunctionDeclaration */:
                        if (hasSyntacticModifier(node, 2 /* Ambient */)) {
                            break;
                        }
                        if (node.name) {
                            recordEmittedDeclarationInScope(node);
                        }
                        else {
                            Debug.assert(node.kind === 260 /* ClassDeclaration */ || hasSyntacticModifier(node, 1024 /* Default */));
                        }
                        break;
                }
            }