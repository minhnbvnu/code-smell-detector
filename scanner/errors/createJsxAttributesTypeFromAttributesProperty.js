function createJsxAttributesTypeFromAttributesProperty(openingLikeElement, checkMode) {
                const attributes = openingLikeElement.attributes;
                const attributesType = getContextualType2(attributes, 0 /* None */);
                const allAttributesTable = strictNullChecks ? createSymbolTable() : void 0;
                let attributesTable = createSymbolTable();
                let spread = emptyJsxObjectType;
                let hasSpreadAnyType = false;
                let typeToIntersect;
                let explicitlySpecifyChildrenAttribute = false;
                let objectFlags = 2048 /* JsxAttributes */;
                const jsxChildrenPropertyName = getJsxElementChildrenPropertyName(getJsxNamespaceAt(openingLikeElement));
                for (const attributeDecl of attributes.properties) {
                    const member = attributeDecl.symbol;
                    if (isJsxAttribute(attributeDecl)) {
                        const exprType = checkJsxAttribute(attributeDecl, checkMode);
                        objectFlags |= getObjectFlags(exprType) & 458752 /* PropagatingFlags */;
                        const attributeSymbol = createSymbol(4 /* Property */ | member.flags, member.escapedName);
                        attributeSymbol.declarations = member.declarations;
                        attributeSymbol.parent = member.parent;
                        if (member.valueDeclaration) {
                            attributeSymbol.valueDeclaration = member.valueDeclaration;
                        }
                        attributeSymbol.links.type = exprType;
                        attributeSymbol.links.target = member;
                        attributesTable.set(attributeSymbol.escapedName, attributeSymbol);
                        allAttributesTable == null ? void 0 : allAttributesTable.set(attributeSymbol.escapedName, attributeSymbol);
                        if (attributeDecl.name.escapedText === jsxChildrenPropertyName) {
                            explicitlySpecifyChildrenAttribute = true;
                        }
                        if (attributesType) {
                            const prop = getPropertyOfType(attributesType, member.escapedName);
                            if (prop && prop.declarations && isDeprecatedSymbol(prop)) {
                                addDeprecatedSuggestion(attributeDecl.name, prop.declarations, attributeDecl.name.escapedText);
                            }
                        }
                    }
                    else {
                        Debug.assert(attributeDecl.kind === 290 /* JsxSpreadAttribute */);
                        if (attributesTable.size > 0) {
                            spread = getSpreadType(spread, createJsxAttributesType(), attributes.symbol, objectFlags, 
                            /*readonly*/
                            false);
                            attributesTable = createSymbolTable();
                        }
                        const exprType = getReducedType(checkExpressionCached(attributeDecl.expression, checkMode));
                        if (isTypeAny(exprType)) {
                            hasSpreadAnyType = true;
                        }
                        if (isValidSpreadType(exprType)) {
                            spread = getSpreadType(spread, exprType, attributes.symbol, objectFlags, 
                            /*readonly*/
                            false);
                            if (allAttributesTable) {
                                checkSpreadPropOverrides(exprType, allAttributesTable, attributeDecl);
                            }
                        }
                        else {
                            error(attributeDecl.expression, Diagnostics.Spread_types_may_only_be_created_from_object_types);
                            typeToIntersect = typeToIntersect ? getIntersectionType([typeToIntersect, exprType]) : exprType;
                        }
                    }
                }
                if (!hasSpreadAnyType) {
                    if (attributesTable.size > 0) {
                        spread = getSpreadType(spread, createJsxAttributesType(), attributes.symbol, objectFlags, 
                        /*readonly*/
                        false);
                    }
                }
                const parent2 = openingLikeElement.parent.kind === 281 /* JsxElement */ ? openingLikeElement.parent : void 0;
                if (parent2 && parent2.openingElement === openingLikeElement && parent2.children.length > 0) {
                    const childrenTypes = checkJsxChildren(parent2, checkMode);
                    if (!hasSpreadAnyType && jsxChildrenPropertyName && jsxChildrenPropertyName !== "") {
                        if (explicitlySpecifyChildrenAttribute) {
                            error(attributes, Diagnostics._0_are_specified_twice_The_attribute_named_0_will_be_overwritten, unescapeLeadingUnderscores(jsxChildrenPropertyName));
                        }
                        const contextualType = getApparentTypeOfContextualType(openingLikeElement.attributes, 
                        /*contextFlags*/
                        void 0);
                        const childrenContextualType = contextualType && getTypeOfPropertyOfContextualType(contextualType, jsxChildrenPropertyName);
                        const childrenPropSymbol = createSymbol(4 /* Property */, jsxChildrenPropertyName);
                        childrenPropSymbol.links.type = childrenTypes.length === 1 ? childrenTypes[0] : childrenContextualType && someType(childrenContextualType, isTupleLikeType) ? createTupleType(childrenTypes) : createArrayType(getUnionType(childrenTypes));
                        childrenPropSymbol.valueDeclaration = factory.createPropertySignature(
                        /*modifiers*/
                        void 0, unescapeLeadingUnderscores(jsxChildrenPropertyName), 
                        /*questionToken*/
                        void 0, 
                        /*type*/
                        void 0);
                        setParent(childrenPropSymbol.valueDeclaration, attributes);
                        childrenPropSymbol.valueDeclaration.symbol = childrenPropSymbol;
                        const childPropMap = createSymbolTable();
                        childPropMap.set(jsxChildrenPropertyName, childrenPropSymbol);
                        spread = getSpreadType(spread, createAnonymousType(attributes.symbol, childPropMap, emptyArray, emptyArray, emptyArray), attributes.symbol, objectFlags, 
                        /*readonly*/
                        false);
                    }
                }
                if (hasSpreadAnyType) {
                    return anyType;
                }
                if (typeToIntersect && spread !== emptyJsxObjectType) {
                    return getIntersectionType([typeToIntersect, spread]);
                }
                return typeToIntersect || (spread === emptyJsxObjectType ? createJsxAttributesType() : spread);
                function createJsxAttributesType() {
                    objectFlags |= freshObjectLiteralFlag;
                    const result = createAnonymousType(attributes.symbol, attributesTable, emptyArray, emptyArray, emptyArray);
                    result.objectFlags |= objectFlags | 128 /* ObjectLiteral */ | 131072 /* ContainsObjectOrArrayLiteral */;
                    return result;
                }
            }