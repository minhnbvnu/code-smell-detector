function findBestTypeForObjectLiteral(source, unionTarget) {
                if (getObjectFlags(source) & 128 /* ObjectLiteral */ && someType(unionTarget, isArrayLikeType)) {
                    return find(unionTarget.types, (t) => !isArrayLikeType(t));
                }
            }