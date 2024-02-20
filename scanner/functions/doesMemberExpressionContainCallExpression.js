function doesMemberExpressionContainCallExpression(node) {
                let currentNode = node.object;
                let currentNodeType = node.object.type;
                while (currentNodeType === "MemberExpression") {
                    currentNode = currentNode.object;
                    currentNodeType = currentNode.type;
                }
                return currentNodeType === "CallExpression";
            }