function isHomomorphicMappedTypeWithNonHomomorphicInstantiation(type2) {
                        return isMappedTypeWithKeyofConstraintDeclaration(type2) && !(getModifiersTypeFromMappedType(type2).flags & 262144 /* TypeParameter */);
                    }