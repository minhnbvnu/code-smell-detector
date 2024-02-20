function getSpreadSymbol(prop, readonly) {
                const isSetonlyAccessor = prop.flags & 65536 /* SetAccessor */ && !(prop.flags & 32768 /* GetAccessor */);
                if (!isSetonlyAccessor && readonly === isReadonlySymbol(prop)) {
                    return prop;
                }
                const flags = 4 /* Property */ | prop.flags & 16777216 /* Optional */;
                const result = createSymbol(flags, prop.escapedName, getIsLateCheckFlag(prop) | (readonly ? 8 /* Readonly */ : 0));
                result.links.type = isSetonlyAccessor ? undefinedType : getTypeOfSymbol(prop);
                result.declarations = prop.declarations;
                result.links.nameType = getSymbolLinks(prop).nameType;
                result.links.syntheticOrigin = prop;
                return result;
            }