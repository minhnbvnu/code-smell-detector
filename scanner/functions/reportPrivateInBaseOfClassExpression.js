function reportPrivateInBaseOfClassExpression(propertyName) {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.Property_0_of_exported_class_expression_may_not_be_private_or_protected, propertyName));
                }
            }