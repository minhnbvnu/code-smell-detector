function transformVariableStatement(input) {
                if (!forEach(input.declarationList.declarations, getBindingNameVisible))
                    return;
                const nodes = visitNodes2(input.declarationList.declarations, visitDeclarationSubtree, isVariableDeclaration);
                if (!length(nodes))
                    return;
                return factory2.updateVariableStatement(input, factory2.createNodeArray(ensureModifiers(input)), factory2.updateVariableDeclarationList(input.declarationList, nodes));
            }