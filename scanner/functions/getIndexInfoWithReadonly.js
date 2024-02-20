function getIndexInfoWithReadonly(info, readonly) {
                return info.isReadonly !== readonly ? createIndexInfo(info.keyType, info.type, readonly, info.declaration) : info;
            }