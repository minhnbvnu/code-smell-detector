function hasInferredName(node) {
                const parent = node.parent;
                return isObjectOrClassMethod(node) ||
                    (parent.type === "VariableDeclarator" && parent.id.type === "Identifier" && parent.init === node) ||
                    (parent.type === "Property" && parent.value === node) ||
                    (parent.type === "PropertyDefinition" && parent.value === node) ||
                    (parent.type === "AssignmentExpression" && parent.left.type === "Identifier" && parent.right === node) ||
                    (parent.type === "AssignmentPattern" && parent.left.type === "Identifier" && parent.right === node);
            }