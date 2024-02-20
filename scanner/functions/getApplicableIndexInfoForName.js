function getApplicableIndexInfoForName(type, name) {
                return getApplicableIndexInfo(type, isLateBoundName(name) ? esSymbolType : getStringLiteralType(unescapeLeadingUnderscores(name)));
            }