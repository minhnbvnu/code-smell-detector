function getTypeOfAccessors(symbol) {
                const links = getSymbolLinks(symbol);
                if (!links.type) {
                    if (!pushTypeResolution(symbol, 0 /* Type */)) {
                        return errorType;
                    }
                    const getter = getDeclarationOfKind(symbol, 174 /* GetAccessor */);
                    const setter = getDeclarationOfKind(symbol, 175 /* SetAccessor */);
                    const accessor = tryCast(getDeclarationOfKind(symbol, 169 /* PropertyDeclaration */), isAutoAccessorPropertyDeclaration);
                    let type = getter && isInJSFile(getter) && getTypeForDeclarationFromJSDocComment(getter) || getAnnotatedAccessorType(getter) || getAnnotatedAccessorType(setter) || getAnnotatedAccessorType(accessor) || getter && getter.body && getReturnTypeFromBody(getter) || accessor && accessor.initializer && getWidenedTypeForVariableLikeDeclaration(accessor, 
                    /*includeOptionality*/
                    true);
                    if (!type) {
                        if (setter && !isPrivateWithinAmbient(setter)) {
                            errorOrSuggestion(noImplicitAny, setter, Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation, symbolToString(symbol));
                        }
                        else if (getter && !isPrivateWithinAmbient(getter)) {
                            errorOrSuggestion(noImplicitAny, getter, Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation, symbolToString(symbol));
                        }
                        else if (accessor && !isPrivateWithinAmbient(accessor)) {
                            errorOrSuggestion(noImplicitAny, accessor, Diagnostics.Member_0_implicitly_has_an_1_type, symbolToString(symbol), "any");
                        }
                        type = anyType;
                    }
                    if (!popTypeResolution()) {
                        if (getAnnotatedAccessorTypeNode(getter)) {
                            error(getter, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, symbolToString(symbol));
                        }
                        else if (getAnnotatedAccessorTypeNode(setter)) {
                            error(setter, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, symbolToString(symbol));
                        }
                        else if (getAnnotatedAccessorTypeNode(accessor)) {
                            error(setter, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, symbolToString(symbol));
                        }
                        else if (getter && noImplicitAny) {
                            error(getter, Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, symbolToString(symbol));
                        }
                        type = anyType;
                    }
                    links.type = type;
                }
                return links.type;
            }