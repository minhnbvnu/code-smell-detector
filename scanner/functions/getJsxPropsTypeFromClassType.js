function getJsxPropsTypeFromClassType(sig, context) {
                const ns = getJsxNamespaceAt(context);
                const forcedLookupLocation = getJsxElementPropertiesName(ns);
                let attributesType = forcedLookupLocation === void 0 ? getTypeOfFirstParameterOfSignatureWithFallback(sig, unknownType) : forcedLookupLocation === "" ? getReturnTypeOfSignature(sig) : getJsxPropsTypeForSignatureFromMember(sig, forcedLookupLocation);
                if (!attributesType) {
                    if (!!forcedLookupLocation && !!length(context.attributes.properties)) {
                        error(context, Diagnostics.JSX_element_class_does_not_support_attributes_because_it_does_not_have_a_0_property, unescapeLeadingUnderscores(forcedLookupLocation));
                    }
                    return unknownType;
                }
                attributesType = getJsxManagedAttributesFromLocatedAttributes(context, ns, attributesType);
                if (isTypeAny(attributesType)) {
                    return attributesType;
                }
                else {
                    let apparentAttributesType = attributesType;
                    const intrinsicClassAttribs = getJsxType(JsxNames.IntrinsicClassAttributes, context);
                    if (!isErrorType(intrinsicClassAttribs)) {
                        const typeParams = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(intrinsicClassAttribs.symbol);
                        const hostClassType = getReturnTypeOfSignature(sig);
                        let libraryManagedAttributeType;
                        if (typeParams) {
                            const inferredArgs = fillMissingTypeArguments([hostClassType], typeParams, getMinTypeArgumentCount(typeParams), isInJSFile(context));
                            libraryManagedAttributeType = instantiateType(intrinsicClassAttribs, createTypeMapper(typeParams, inferredArgs));
                        }
                        else
                            libraryManagedAttributeType = intrinsicClassAttribs;
                        apparentAttributesType = intersectTypes(libraryManagedAttributeType, apparentAttributesType);
                    }
                    const intrinsicAttribs = getJsxType(JsxNames.IntrinsicAttributes, context);
                    if (!isErrorType(intrinsicAttribs)) {
                        apparentAttributesType = intersectTypes(intrinsicAttribs, apparentAttributesType);
                    }
                    return apparentAttributesType;
                }
            }