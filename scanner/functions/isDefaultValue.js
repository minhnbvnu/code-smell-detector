function isDefaultValue(fullNumberNode) {
                const parent = fullNumberNode.parent;
                return parent.type === "AssignmentPattern" && parent.right === fullNumberNode;
            }