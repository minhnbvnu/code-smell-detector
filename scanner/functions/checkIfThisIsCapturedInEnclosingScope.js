function checkIfThisIsCapturedInEnclosingScope(node) {
                findAncestor(node, (current) => {
                    if (getNodeCheckFlags(current) & 4 /* CaptureThis */) {
                        const isDeclaration2 = node.kind !== 79 /* Identifier */;
                        if (isDeclaration2) {
                            error(getNameOfDeclaration(node), Diagnostics.Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference);
                        }
                        else {
                            error(node, Diagnostics.Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference);
                        }
                        return true;
                    }
                    return false;
                });
            }