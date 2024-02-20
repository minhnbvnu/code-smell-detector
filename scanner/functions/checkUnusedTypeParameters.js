function checkUnusedTypeParameters(node, addDiagnostic) {
                const declarations = getSymbolOfDeclaration(node).declarations;
                if (!declarations || last(declarations) !== node)
                    return;
                const typeParameters = getEffectiveTypeParameterDeclarations(node);
                const seenParentsWithEveryUnused = /* @__PURE__ */ new Set();
                for (const typeParameter of typeParameters) {
                    if (!isTypeParameterUnused(typeParameter))
                        continue;
                    const name = idText(typeParameter.name);
                    const { parent: parent2 } = typeParameter;
                    if (parent2.kind !== 192 /* InferType */ && parent2.typeParameters.every(isTypeParameterUnused)) {
                        if (tryAddToSet(seenParentsWithEveryUnused, parent2)) {
                            const sourceFile = getSourceFileOfNode(parent2);
                            const range = isJSDocTemplateTag(parent2) ? rangeOfNode(parent2) : rangeOfTypeParameters(sourceFile, parent2.typeParameters);
                            const only = parent2.typeParameters.length === 1;
                            const message = only ? Diagnostics._0_is_declared_but_its_value_is_never_read : Diagnostics.All_type_parameters_are_unused;
                            const arg0 = only ? name : void 0;
                            addDiagnostic(typeParameter, 1 /* Parameter */, createFileDiagnostic(sourceFile, range.pos, range.end - range.pos, message, arg0));
                        }
                    }
                    else {
                        addDiagnostic(typeParameter, 1 /* Parameter */, createDiagnosticForNode(typeParameter, Diagnostics._0_is_declared_but_its_value_is_never_read, name));
                    }
                }
            }