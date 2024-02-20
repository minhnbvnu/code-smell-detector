function paramIsShadowing(scope, name) {
                return astUtils.getVariableByName(scope, name) !== null;
            }