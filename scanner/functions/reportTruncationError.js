function reportTruncationError() {
                if (errorNameNode || errorFallbackNode) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed));
                }
            }