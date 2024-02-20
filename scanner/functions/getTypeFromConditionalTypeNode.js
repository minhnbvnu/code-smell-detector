function getTypeFromConditionalTypeNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    const checkType = getTypeFromTypeNode(node.checkType);
                    const aliasSymbol = getAliasSymbolForTypeNode(node);
                    const aliasTypeArguments = getTypeArgumentsForAliasSymbol(aliasSymbol);
                    const allOuterTypeParameters = getOuterTypeParameters(node, 
                    /*includeThisTypes*/
                    true);
                    const outerTypeParameters = aliasTypeArguments ? allOuterTypeParameters : filter(allOuterTypeParameters, (tp) => isTypeParameterPossiblyReferenced(tp, node));
                    const root = {
                        node,
                        checkType,
                        extendsType: getTypeFromTypeNode(node.extendsType),
                        isDistributive: !!(checkType.flags & 262144 /* TypeParameter */),
                        inferTypeParameters: getInferTypeParameters(node),
                        outerTypeParameters,
                        instantiations: void 0,
                        aliasSymbol,
                        aliasTypeArguments
                    };
                    links.resolvedType = getConditionalType(root, 
                    /*mapper*/
                    void 0);
                    if (outerTypeParameters) {
                        root.instantiations = /* @__PURE__ */ new Map();
                        root.instantiations.set(getTypeListId(outerTypeParameters), links.resolvedType);
                    }
                }
                return links.resolvedType;
            }