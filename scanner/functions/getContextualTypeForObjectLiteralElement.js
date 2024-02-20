function getContextualTypeForObjectLiteralElement(element, contextFlags) {
                const objectLiteral = element.parent;
                const propertyAssignmentType = isPropertyAssignment(element) && getContextualTypeForVariableLikeDeclaration(element, contextFlags);
                if (propertyAssignmentType) {
                    return propertyAssignmentType;
                }
                const type = getApparentTypeOfContextualType(objectLiteral, contextFlags);
                if (type) {
                    if (hasBindableName(element)) {
                        const symbol = getSymbolOfDeclaration(element);
                        return getTypeOfPropertyOfContextualType(type, symbol.escapedName, getSymbolLinks(symbol).nameType);
                    }
                    if (element.name) {
                        const nameType = getLiteralTypeFromPropertyName(element.name);
                        return mapType(type, (t) => {
                            var _a2;
                            return (_a2 = findApplicableIndexInfo(getIndexInfosOfStructuredType(t), nameType)) == null ? void 0 : _a2.type;
                        }, 
                        /*noReductions*/
                        true);
                    }
                }
                return void 0;
            }