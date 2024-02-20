function serializeIndexSignatures(input, baseType) {
                        const results2 = [];
                        for (const info of getIndexInfosOfType(input)) {
                            if (baseType) {
                                const baseInfo = getIndexInfoOfType(baseType, info.keyType);
                                if (baseInfo) {
                                    if (isTypeIdenticalTo(info.type, baseInfo.type)) {
                                        continue;
                                    }
                                }
                            }
                            results2.push(indexInfoToIndexSignatureDeclarationHelper(info, context, 
                            /*typeNode*/
                            void 0));
                        }
                        return results2;
                    }