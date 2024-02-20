function eachUnionContains(unionTypes2, type) {
                for (const u of unionTypes2) {
                    if (!containsType(u.types, type)) {
                        const primitive = type.flags & 128 /* StringLiteral */ ? stringType : type.flags & 256 /* NumberLiteral */ ? numberType : type.flags & 2048 /* BigIntLiteral */ ? bigintType : type.flags & 8192 /* UniqueESSymbol */ ? esSymbolType : void 0;
                        if (!primitive || !containsType(u.types, primitive)) {
                            return false;
                        }
                    }
                }
                return true;
            }