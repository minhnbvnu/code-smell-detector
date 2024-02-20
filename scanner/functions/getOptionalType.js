function getOptionalType(type, isProperty = false) {
                Debug.assert(strictNullChecks);
                const missingOrUndefined = isProperty ? undefinedOrMissingType : undefinedType;
                return type === missingOrUndefined || type.flags & 1048576 /* Union */ && type.types[0] === missingOrUndefined ? type : getUnionType([type, missingOrUndefined]);
            }