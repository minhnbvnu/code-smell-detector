function isAssigningToPropertyOf(node) {
                return (node.parent.type === "MemberExpression" &&
                    node.parent.object === node &&
                    node.parent.parent.type === "AssignmentExpression" &&
                    node.parent.parent.left === node.parent);
            }