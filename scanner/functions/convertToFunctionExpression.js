function convertToFunctionExpression(node) {
                if (!node.body)
                    return Debug.fail(`Cannot convert a FunctionDeclaration without a body`);
                const updated = factory2.createFunctionExpression(getModifiers(node), node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body);
                setOriginalNode(updated, node);
                setTextRange(updated, node);
                if (getStartsOnNewLine(node)) {
                    setStartsOnNewLine(updated, 
                    /*newLine*/
                    true);
                }
                return updated;
            }