function getExtractStringType(type) {
                if (keyofStringsOnly) {
                    return type;
                }
                const extractTypeAlias = getGlobalExtractSymbol();
                return extractTypeAlias ? getTypeAliasInstantiation(extractTypeAlias, [type, stringType]) : stringType;
            }