function checkTypeParameterDeferred(node) {
                var _a2, _b;
                if (isInterfaceDeclaration(node.parent) || isClassLike(node.parent) || isTypeAliasDeclaration(node.parent)) {
                    const typeParameter = getDeclaredTypeOfTypeParameter(getSymbolOfDeclaration(node));
                    const modifiers = getTypeParameterModifiers(typeParameter) & (32768 /* In */ | 65536 /* Out */);
                    if (modifiers) {
                        const symbol = getSymbolOfDeclaration(node.parent);
                        if (isTypeAliasDeclaration(node.parent) && !(getObjectFlags(getDeclaredTypeOfSymbol(symbol)) & (16 /* Anonymous */ | 32 /* Mapped */))) {
                            error(node, Diagnostics.Variance_annotations_are_only_supported_in_type_aliases_for_object_function_constructor_and_mapped_types);
                        }
                        else if (modifiers === 32768 /* In */ || modifiers === 65536 /* Out */) {
                            (_a2 = tracing) == null ? void 0 : _a2.push(tracing.Phase.CheckTypes, "checkTypeParameterDeferred", { parent: getTypeId(getDeclaredTypeOfSymbol(symbol)), id: getTypeId(typeParameter) });
                            const source = createMarkerType(symbol, typeParameter, modifiers === 65536 /* Out */ ? markerSubTypeForCheck : markerSuperTypeForCheck);
                            const target = createMarkerType(symbol, typeParameter, modifiers === 65536 /* Out */ ? markerSuperTypeForCheck : markerSubTypeForCheck);
                            const saveVarianceTypeParameter = typeParameter;
                            varianceTypeParameter = typeParameter;
                            checkTypeAssignableTo(source, target, node, Diagnostics.Type_0_is_not_assignable_to_type_1_as_implied_by_variance_annotation);
                            varianceTypeParameter = saveVarianceTypeParameter;
                            (_b = tracing) == null ? void 0 : _b.pop();
                        }
                    }
                }
            }