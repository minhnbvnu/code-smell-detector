function getTypeOfDestructuredProperty(type, name) {
                var _a2;
                const nameType = getLiteralTypeFromPropertyName(name);
                if (!isTypeUsableAsPropertyName(nameType))
                    return errorType;
                const text = getPropertyNameFromType(nameType);
                return getTypeOfPropertyOfType(type, text) || includeUndefinedInIndexSignature((_a2 = getApplicableIndexInfoForName(type, text)) == null ? void 0 : _a2.type) || errorType;
            }