function reportCyclicStructureError() {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary, errorDeclarationNameWithFallback()));
                }
            }