function isNamedEvaluation(node, cb) {
            if (!isNamedEvaluationSource(node))
                return false;
            switch (node.kind) {
                case 299 /* PropertyAssignment */:
                    return isAnonymousFunctionDefinition(node.initializer, cb);
                case 300 /* ShorthandPropertyAssignment */:
                    return isAnonymousFunctionDefinition(node.objectAssignmentInitializer, cb);
                case 257 /* VariableDeclaration */:
                case 166 /* Parameter */:
                case 205 /* BindingElement */:
                case 169 /* PropertyDeclaration */:
                    return isAnonymousFunctionDefinition(node.initializer, cb);
                case 223 /* BinaryExpression */:
                    return isAnonymousFunctionDefinition(node.right, cb);
                case 274 /* ExportAssignment */:
                    return isAnonymousFunctionDefinition(node.expression, cb);
            }
        }