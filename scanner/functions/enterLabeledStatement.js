function enterLabeledStatement(node) {
                if (!astUtils.isBreakableStatement(node.body)) {
                    scopeInfo = {
                        label: node.label,
                        breakable: false,
                        upper: scopeInfo
                    };
                }
            }