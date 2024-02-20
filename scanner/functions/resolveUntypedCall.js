function resolveUntypedCall(node) {
                if (callLikeExpressionMayHaveTypeArguments(node)) {
                    forEach(node.typeArguments, checkSourceElement);
                }
                if (node.kind === 212 /* TaggedTemplateExpression */) {
                    checkExpression(node.template);
                }
                else if (isJsxOpeningLikeElement(node)) {
                    checkExpression(node.attributes);
                }
                else if (node.kind !== 167 /* Decorator */) {
                    forEach(node.arguments, (argument) => {
                        checkExpression(argument);
                    });
                }
                return anySignature;
            }