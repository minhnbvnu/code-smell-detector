function checkDestructuringAssignment(node) {
                if (node.right.type === "Identifier") {
                    const objectName = node.right.name;
                    if (node.left.type === "ObjectPattern") {
                        node.left.properties.forEach(property => {
                            checkPropertyAccess(node.left, objectName, astUtils.getStaticPropertyName(property));
                        });
                    }
                }
            }