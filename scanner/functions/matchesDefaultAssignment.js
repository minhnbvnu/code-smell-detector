function matchesDefaultAssignment(node) {
                return node.test.type === "Identifier" &&
                    node.consequent.type === "Identifier" &&
                    node.test.name === node.consequent.name;
            }