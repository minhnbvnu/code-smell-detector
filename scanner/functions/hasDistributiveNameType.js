function hasDistributiveNameType(mappedType) {
                const typeVariable = getTypeParameterFromMappedType(mappedType);
                return isDistributive(getNameTypeFromMappedType(mappedType) || typeVariable);
                function isDistributive(type) {
                    return type.flags & (3 /* AnyOrUnknown */ | 134348796 /* Primitive */ | 131072 /* Never */ | 262144 /* TypeParameter */ | 524288 /* Object */ | 67108864 /* NonPrimitive */) ? true : type.flags & 16777216 /* Conditional */ ? type.root.isDistributive && type.checkType === typeVariable : type.flags & (3145728 /* UnionOrIntersection */ | 134217728 /* TemplateLiteral */) ? every(type.types, isDistributive) : type.flags & 8388608 /* IndexedAccess */ ? isDistributive(type.objectType) && isDistributive(type.indexType) : type.flags & 33554432 /* Substitution */ ? isDistributive(type.baseType) && isDistributive(type.constraint) : type.flags & 268435456 /* StringMapping */ ? isDistributive(type.type) : false;
                }
            }