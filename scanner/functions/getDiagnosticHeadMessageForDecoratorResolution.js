function getDiagnosticHeadMessageForDecoratorResolution(node) {
                switch (node.parent.kind) {
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                        return Diagnostics.Unable_to_resolve_signature_of_class_decorator_when_called_as_an_expression;
                    case 166 /* Parameter */:
                        return Diagnostics.Unable_to_resolve_signature_of_parameter_decorator_when_called_as_an_expression;
                    case 169 /* PropertyDeclaration */:
                        return Diagnostics.Unable_to_resolve_signature_of_property_decorator_when_called_as_an_expression;
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return Diagnostics.Unable_to_resolve_signature_of_method_decorator_when_called_as_an_expression;
                    default:
                        return Debug.fail();
                }
            }