function reportInaccessibleThisError() {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, errorDeclarationNameWithFallback(), "this"));
                }
            }