function findApplicableIndexInfo(indexInfos, keyType) {
                let stringIndexInfo;
                let applicableInfo;
                let applicableInfos;
                for (const info of indexInfos) {
                    if (info.keyType === stringType) {
                        stringIndexInfo = info;
                    }
                    else if (isApplicableIndexType(keyType, info.keyType)) {
                        if (!applicableInfo) {
                            applicableInfo = info;
                        }
                        else {
                            (applicableInfos || (applicableInfos = [applicableInfo])).push(info);
                        }
                    }
                }
                return applicableInfos ? createIndexInfo(unknownType, getIntersectionType(map(applicableInfos, (info) => info.type)), reduceLeft(applicableInfos, (isReadonly, info) => isReadonly && info.isReadonly, 
                /*initial*/
                true)) : applicableInfo ? applicableInfo : stringIndexInfo && isApplicableIndexType(keyType, stringType) ? stringIndexInfo : void 0;
            }