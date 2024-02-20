function isNamedEvaluationSource(node) {
            switch (node.kind) {
                case 299 /* PropertyAssignment */:
                    return !isProtoSetter(node.name);
                case 300 /* ShorthandPropertyAssignment */:
                    return !!node.objectAssignmentInitializer;
                case 257 /* VariableDeclaration */:
                    return isIdentifier(node.name) && !!node.initializer;
                case 166 /* Parameter */:
                    return isIdentifier(node.name) && !!node.initializer && !node.dotDotDotToken;
                case 205 /* BindingElement */:
                    return isIdentifier(node.name) && !!node.initializer && !node.dotDotDotToken;
                case 169 /* PropertyDeclaration */:
                    return !!node.initializer;
                case 223 /* BinaryExpression */:
                    switch (node.operatorToken.kind) {
                        case 63 /* EqualsToken */:
                        case 76 /* AmpersandAmpersandEqualsToken */:
                        case 75 /* BarBarEqualsToken */:
                        case 77 /* QuestionQuestionEqualsToken */:
                            return isIdentifier(node.left);
                    }
                    break;
                case 274 /* ExportAssignment */:
                    return true;
            }
            return false;
        }