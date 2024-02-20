function findIndexInfo(indexInfos, keyType) {
                return find(indexInfos, (info) => info.keyType === keyType);
            }