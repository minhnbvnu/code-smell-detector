function removeRedundantLiteralTypes(types, includes, reduceVoidUndefined) {
                let i = types.length;
                while (i > 0) {
                    i--;
                    const t = types[i];
                    const flags = t.flags;
                    const remove = flags & (128 /* StringLiteral */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */) && includes & 4 /* String */ || flags & 256 /* NumberLiteral */ && includes & 8 /* Number */ || flags & 2048 /* BigIntLiteral */ && includes & 64 /* BigInt */ || flags & 8192 /* UniqueESSymbol */ && includes & 4096 /* ESSymbol */ || reduceVoidUndefined && flags & 32768 /* Undefined */ && includes & 16384 /* Void */ || isFreshLiteralType(t) && containsType(types, t.regularType);
                    if (remove) {
                        orderedRemoveItemAt(types, i);
                    }
                }
            }