function getJsxPropsTypeFromCallSignature(sig, context) {
                let propsType = getTypeOfFirstParameterOfSignatureWithFallback(sig, unknownType);
                propsType = getJsxManagedAttributesFromLocatedAttributes(context, getJsxNamespaceAt(context), propsType);
                const intrinsicAttribs = getJsxType(JsxNames.IntrinsicAttributes, context);
                if (!isErrorType(intrinsicAttribs)) {
                    propsType = intersectTypes(intrinsicAttribs, propsType);
                }
                return propsType;
            }