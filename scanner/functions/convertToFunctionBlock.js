function convertToFunctionBlock(node, multiLine) {
                if (isBlock(node))
                    return node;
                const returnStatement = factory2.createReturnStatement(node);
                setTextRange(returnStatement, node);
                const body = factory2.createBlock([returnStatement], multiLine);
                setTextRange(body, node);
                return body;
            }