function shouldTreatPropertiesOfExternalModuleAsExports(resolvedExternalModuleType) {
                return !(resolvedExternalModuleType.flags & 134348796 /* Primitive */ || getObjectFlags(resolvedExternalModuleType) & 1 /* Class */ || // `isArrayOrTupleLikeType` is too expensive to use in this auto-imports hot path
                    isArrayType(resolvedExternalModuleType) || isTupleType(resolvedExternalModuleType));
            }