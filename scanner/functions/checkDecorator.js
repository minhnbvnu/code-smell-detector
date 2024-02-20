function checkDecorator(node) {
                const signature = getResolvedSignature(node);
                checkDeprecatedSignature(signature, node);
                const returnType = getReturnTypeOfSignature(signature);
                if (returnType.flags & 1 /* Any */) {
                    return;
                }
                const decoratorSignature = getDecoratorCallSignature(node);
                if (!(decoratorSignature == null ? void 0 : decoratorSignature.resolvedReturnType))
                    return;
                let headMessage;
                const expectedReturnType = decoratorSignature.resolvedReturnType;
                switch (node.parent.kind) {
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                        headMessage = Diagnostics.Decorator_function_return_type_0_is_not_assignable_to_type_1;
                        break;
                    case 169 /* PropertyDeclaration */:
                        if (!legacyDecorators) {
                            headMessage = Diagnostics.Decorator_function_return_type_0_is_not_assignable_to_type_1;
                            break;
                        }
                    case 166 /* Parameter */:
                        headMessage = Diagnostics.Decorator_function_return_type_is_0_but_is_expected_to_be_void_or_any;
                        break;
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        headMessage = Diagnostics.Decorator_function_return_type_0_is_not_assignable_to_type_1;
                        break;
                    default:
                        return Debug.failBadSyntaxKind(node.parent);
                }
                checkTypeAssignableTo(returnType, expectedReturnType, node.expression, headMessage);
            }