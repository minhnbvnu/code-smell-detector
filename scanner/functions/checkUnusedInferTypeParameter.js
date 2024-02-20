function checkUnusedInferTypeParameter(node, addDiagnostic) {
                const { typeParameter } = node;
                if (isTypeParameterUnused(typeParameter)) {
                    addDiagnostic(node, 1 /* Parameter */, createDiagnosticForNode(node, Diagnostics._0_is_declared_but_its_value_is_never_read, idText(typeParameter.name)));
                }
            }