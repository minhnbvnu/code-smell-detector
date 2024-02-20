function getEffectiveJSDocHost(node) {
            const host = getJSDocHost(node);
            if (host) {
                return getSourceOfDefaultedAssignment(host) || getSourceOfAssignment(host) || getSingleInitializerOfVariableStatementOrPropertyDeclaration(host) || getSingleVariableOfVariableStatement(host) || getNestedModuleDeclaration(host) || host;
            }
        }