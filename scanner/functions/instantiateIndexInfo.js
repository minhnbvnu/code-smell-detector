function instantiateIndexInfo(info, mapper) {
                return createIndexInfo(info.keyType, instantiateType(info.type, mapper), info.isReadonly, info.declaration);
            }