function enterLabeledScope(node) {
                scopeInfo = {
                    label: node.label.name,
                    used: false,
                    upper: scopeInfo
                };
            }