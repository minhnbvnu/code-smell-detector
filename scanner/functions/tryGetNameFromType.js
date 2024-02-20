function tryGetNameFromType(type) {
                return type.flags & 8192 /* UniqueESSymbol */ ? type.escapedName : type.flags & 384 /* StringOrNumberLiteral */ ? escapeLeadingUnderscores("" + type.value) : void 0;
            }