function removeRedundantSupertypes(types, includes) {
                let i = types.length;
                while (i > 0) {
                    i--;
                    const t = types[i];
                    const remove = t.flags & 4 /* String */ && includes & (128 /* StringLiteral */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */) || t.flags & 8 /* Number */ && includes & 256 /* NumberLiteral */ || t.flags & 64 /* BigInt */ && includes & 2048 /* BigIntLiteral */ || t.flags & 4096 /* ESSymbol */ && includes & 8192 /* UniqueESSymbol */ || t.flags & 16384 /* Void */ && includes & 32768 /* Undefined */ || isEmptyAnonymousObjectType(t) && includes & 470302716 /* DefinitelyNonNullable */;
                    if (remove) {
                        orderedRemoveItemAt(types, i);
                    }
                }
            }