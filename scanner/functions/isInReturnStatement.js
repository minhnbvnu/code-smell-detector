function isInReturnStatement(node) {
                for (let currentNode = node; currentNode; currentNode = currentNode.parent) {
                    if (currentNode.type === "ReturnStatement" ||
                        (currentNode.type === "ArrowFunctionExpression" && currentNode.body.type !== "BlockStatement")) {
                        return true;
                    }
                }
                return false;
            }