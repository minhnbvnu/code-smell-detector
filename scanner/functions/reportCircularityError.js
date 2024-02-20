function reportCircularityError(symbol) {
                const declaration = symbol.valueDeclaration;
                if (getEffectiveTypeAnnotationNode(declaration)) {
                    error(symbol.valueDeclaration, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, symbolToString(symbol));
                    return errorType;
                }
                if (noImplicitAny && (declaration.kind !== 166 /* Parameter */ || declaration.initializer)) {
                    error(symbol.valueDeclaration, Diagnostics._0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer, symbolToString(symbol));
                }
                return anyType;
            }