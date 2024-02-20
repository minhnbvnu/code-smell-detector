function getWidenedUniqueESSymbolType(type) {
                return type.flags & 8192 /* UniqueESSymbol */ ? esSymbolType : type.flags & 1048576 /* Union */ ? mapType(type, getWidenedUniqueESSymbolType) : type;
            }