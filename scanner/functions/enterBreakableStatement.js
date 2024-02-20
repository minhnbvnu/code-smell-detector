function enterBreakableStatement(node) {
                scopeInfo = {
                    label: node.parent.type === "LabeledStatement" ? node.parent.label : null,
                    breakable: true,
                    upper: scopeInfo
                };
            }