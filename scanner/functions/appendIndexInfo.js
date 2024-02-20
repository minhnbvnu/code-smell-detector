function appendIndexInfo(indexInfos, newInfo, union) {
                if (indexInfos) {
                    for (let i = 0; i < indexInfos.length; i++) {
                        const info = indexInfos[i];
                        if (info.keyType === newInfo.keyType) {
                            indexInfos[i] = createIndexInfo(info.keyType, union ? getUnionType([info.type, newInfo.type]) : getIntersectionType([info.type, newInfo.type]), union ? info.isReadonly || newInfo.isReadonly : info.isReadonly && newInfo.isReadonly);
                            return indexInfos;
                        }
                    }
                }
                return append(indexInfos, newInfo);
            }