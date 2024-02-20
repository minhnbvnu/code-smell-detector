function checkIfNewTargetIsCapturedInEnclosingScope(node) {
                findAncestor(node, (current) => {
                    if (getNodeCheckFlags(current) & 8 /* CaptureNewTarget */) {
                        const isDeclaration2 = node.kind !== 79 /* Identifier */;
                        if (isDeclaration2) {
                            error(getNameOfDeclaration(node), Diagnostics.Duplicate_identifier_newTarget_Compiler_uses_variable_declaration_newTarget_to_capture_new_target_meta_property_reference);
                        }
                        else {
                            error(node, Diagnostics.Expression_resolves_to_variable_declaration_newTarget_that_compiler_uses_to_capture_new_target_meta_property_reference);
                        }
                        return true;
                    }
                    return false;
                });
            }