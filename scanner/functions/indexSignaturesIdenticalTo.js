function indexSignaturesIdenticalTo(source2, target2) {
                    const sourceInfos = getIndexInfosOfType(source2);
                    const targetInfos = getIndexInfosOfType(target2);
                    if (sourceInfos.length !== targetInfos.length) {
                        return 0 /* False */;
                    }
                    for (const targetInfo of targetInfos) {
                        const sourceInfo = getIndexInfoOfType(source2, targetInfo.keyType);
                        if (!(sourceInfo && isRelatedTo(sourceInfo.type, targetInfo.type, 3 /* Both */) && sourceInfo.isReadonly === targetInfo.isReadonly)) {
                            return 0 /* False */;
                        }
                    }
                    return -1 /* True */;
                }