function getUnionIndexInfos(types) {
                const sourceInfos = getIndexInfosOfType(types[0]);
                if (sourceInfos) {
                    const result = [];
                    for (const info of sourceInfos) {
                        const indexType = info.keyType;
                        if (every(types, (t) => !!getIndexInfoOfType(t, indexType))) {
                            result.push(createIndexInfo(indexType, getUnionType(map(types, (t) => getIndexTypeOfType(t, indexType))), some(types, (t) => getIndexInfoOfType(t, indexType).isReadonly)));
                        }
                    }
                    return result;
                }
                return emptyArray;
            }