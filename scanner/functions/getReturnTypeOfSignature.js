function getReturnTypeOfSignature(signature) {
                if (!signature.resolvedReturnType) {
                    if (!pushTypeResolution(signature, 3 /* ResolvedReturnType */)) {
                        return errorType;
                    }
                    let type = signature.target ? instantiateType(getReturnTypeOfSignature(signature.target), signature.mapper) : signature.compositeSignatures ? instantiateType(getUnionOrIntersectionType(map(signature.compositeSignatures, getReturnTypeOfSignature), signature.compositeKind, 2 /* Subtype */), signature.mapper) : getReturnTypeFromAnnotation(signature.declaration) || (nodeIsMissing(signature.declaration.body) ? anyType : getReturnTypeFromBody(signature.declaration));
                    if (signature.flags & 8 /* IsInnerCallChain */) {
                        type = addOptionalTypeMarker(type);
                    }
                    else if (signature.flags & 16 /* IsOuterCallChain */) {
                        type = getOptionalType(type);
                    }
                    if (!popTypeResolution()) {
                        if (signature.declaration) {
                            const typeNode = getEffectiveReturnTypeNode(signature.declaration);
                            if (typeNode) {
                                error(typeNode, Diagnostics.Return_type_annotation_circularly_references_itself);
                            }
                            else if (noImplicitAny) {
                                const declaration = signature.declaration;
                                const name = getNameOfDeclaration(declaration);
                                if (name) {
                                    error(name, Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, declarationNameToString(name));
                                }
                                else {
                                    error(declaration, Diagnostics.Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions);
                                }
                            }
                        }
                        type = anyType;
                    }
                    signature.resolvedReturnType = type;
                }
                return signature.resolvedReturnType;
            }