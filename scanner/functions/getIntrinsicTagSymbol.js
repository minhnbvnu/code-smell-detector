function getIntrinsicTagSymbol(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedSymbol) {
                    const intrinsicElementsType = getJsxType(JsxNames.IntrinsicElements, node);
                    if (!isErrorType(intrinsicElementsType)) {
                        if (!isIdentifier(node.tagName))
                            return Debug.fail();
                        const intrinsicProp = getPropertyOfType(intrinsicElementsType, node.tagName.escapedText);
                        if (intrinsicProp) {
                            links.jsxFlags |= 1 /* IntrinsicNamedElement */;
                            return links.resolvedSymbol = intrinsicProp;
                        }
                        const indexSignatureType = getIndexTypeOfType(intrinsicElementsType, stringType);
                        if (indexSignatureType) {
                            links.jsxFlags |= 2 /* IntrinsicIndexedElement */;
                            return links.resolvedSymbol = intrinsicElementsType.symbol;
                        }
                        error(node, Diagnostics.Property_0_does_not_exist_on_type_1, idText(node.tagName), "JSX." + JsxNames.IntrinsicElements);
                        return links.resolvedSymbol = unknownSymbol;
                    }
                    else {
                        if (noImplicitAny) {
                            error(node, Diagnostics.JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists, unescapeLeadingUnderscores(JsxNames.IntrinsicElements));
                        }
                        return links.resolvedSymbol = unknownSymbol;
                    }
                }
                return links.resolvedSymbol;
            }