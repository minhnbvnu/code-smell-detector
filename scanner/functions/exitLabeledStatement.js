function exitLabeledStatement(node) {
                if (!astUtils.isBreakableStatement(node.body)) {
                    scopeInfo = scopeInfo.upper;
                }
            }