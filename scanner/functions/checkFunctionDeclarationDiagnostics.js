function checkFunctionDeclarationDiagnostics() {
                    checkFunctionOrMethodDeclaration(node);
                    checkGrammarForGenerator(node);
                    checkCollisionsForDeclarationName(node, node.name);
                }