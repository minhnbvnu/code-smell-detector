function findIdentifier(scope, name) {
                return astUtils.getVariableByName(scope, name) !== null;
            }