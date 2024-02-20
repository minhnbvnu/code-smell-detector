function createIntrinsicType(kind, intrinsicName, objectFlags = 0 /* None */) {
                const type = createType(kind);
                type.intrinsicName = intrinsicName;
                type.objectFlags = objectFlags;
                return type;
            }