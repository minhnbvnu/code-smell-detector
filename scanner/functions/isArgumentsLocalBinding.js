function isArgumentsLocalBinding(nodeIn) {
                if (isGeneratedIdentifier(nodeIn))
                    return false;
                const node = getParseTreeNode(nodeIn, isIdentifier);
                if (!node)
                    return false;
                const parent2 = node.parent;
                if (!parent2)
                    return false;
                const isPropertyName2 = (isPropertyAccessExpression(parent2) || isPropertyAssignment(parent2)) && parent2.name === node;
                return !isPropertyName2 && getReferencedValueSymbol(node) === argumentsSymbol;
            }