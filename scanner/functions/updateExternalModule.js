function updateExternalModule(node) {
                const externalHelpersImportDeclaration = createExternalHelpersImportDeclarationIfNeeded(factory2, emitHelpers(), node, compilerOptions);
                if (externalHelpersImportDeclaration) {
                    const statements = [];
                    const statementOffset = factory2.copyPrologue(node.statements, statements);
                    append(statements, externalHelpersImportDeclaration);
                    addRange(statements, visitNodes2(node.statements, visitor, isStatement, statementOffset));
                    return factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray(statements), node.statements));
                }
                else {
                    return visitEachChild(node, visitor, context);
                }
            }