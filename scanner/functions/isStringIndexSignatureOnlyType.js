function isStringIndexSignatureOnlyType(type) {
                return type.flags & 524288 /* Object */ && !isGenericMappedType(type) && getPropertiesOfType(type).length === 0 && getIndexInfosOfType(type).length === 1 && !!getIndexInfoOfType(type, stringType) || type.flags & 3145728 /* UnionOrIntersection */ && every(type.types, isStringIndexSignatureOnlyType) || false;
            }