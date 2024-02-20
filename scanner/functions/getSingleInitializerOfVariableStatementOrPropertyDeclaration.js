function getSingleInitializerOfVariableStatementOrPropertyDeclaration(node) {
            switch (node.kind) {
                case 240 /* VariableStatement */:
                    const v = getSingleVariableOfVariableStatement(node);
                    return v && v.initializer;
                case 169 /* PropertyDeclaration */:
                    return node.initializer;
                case 299 /* PropertyAssignment */:
                    return node.initializer;
            }
        }