function equalsToOriginalName(node) {
                const localName = node.name;
                const valueNode = node.parent.type === "AssignmentPattern"
                    ? node.parent
                    : node;
                const parent = valueNode.parent;
                switch (parent.type) {
                    case "Property":
                        return ((parent.parent.type === "ObjectPattern" || parent.parent.type === "ObjectExpression") &&
                            parent.value === valueNode &&
                            !parent.computed &&
                            parent.key.type === "Identifier" &&
                            parent.key.name === localName);
                    case "ImportSpecifier":
                        return (parent.local === node &&
                            astUtils.getModuleExportName(parent.imported) === localName);
                    default:
                        return false;
                }
            }