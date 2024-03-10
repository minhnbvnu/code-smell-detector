function isContextSensitive(node) {
                Debug.assert(node.kind !== 171 /* MethodDeclaration */ || isObjectLiteralMethod(node));
                switch (node.kind) {
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                    case 171 /* MethodDeclaration */:
                    case 259 /* FunctionDeclaration */:
                        return isContextSensitiveFunctionLikeDeclaration(node);
                    case 207 /* ObjectLiteralExpression */:
                        return some(node.properties, isContextSensitive);
                    case 206 /* ArrayLiteralExpression */:
                        return some(node.elements, isContextSensitive);
                    case 224 /* ConditionalExpression */:
                        return isContextSensitive(node.whenTrue) || isContextSensitive(node.whenFalse);
                    case 223 /* BinaryExpression */:
                        return (node.operatorToken.kind === 56 /* BarBarToken */ || node.operatorToken.kind === 60 /* QuestionQuestionToken */) && (isContextSensitive(node.left) || isContextSensitive(node.right));
                    case 299 /* PropertyAssignment */:
                        return isContextSensitive(node.initializer);
                    case 214 /* ParenthesizedExpression */:
                        return isContextSensitive(node.expression);
                    case 289 /* JsxAttributes */:
                        return some(node.properties, isContextSensitive) || isJsxOpeningElement(node.parent) && some(node.parent.parent.children, isContextSensitive);
                    case 288 /* JsxAttribute */: {
                        const { initializer } = node;
                        return !!initializer && isContextSensitive(initializer);
                    }
                    case 291 /* JsxExpression */: {
                        const { expression } = node;
                        return !!expression && isContextSensitive(expression);
                    }
                }
                return false;
            }