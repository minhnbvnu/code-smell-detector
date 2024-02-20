function checkObjectLiteral(node) {
                checkList(node.properties.filter(p => p.type === "Property"));
            }