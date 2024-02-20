function visitObjectType(type) {
                    const resolved = resolveStructuredTypeMembers(type);
                    for (const info of resolved.indexInfos) {
                        visitType(info.keyType);
                        visitType(info.type);
                    }
                    for (const signature of resolved.callSignatures) {
                        visitSignature(signature);
                    }
                    for (const signature of resolved.constructSignatures) {
                        visitSignature(signature);
                    }
                    for (const p of resolved.properties) {
                        visitSymbol(p);
                    }
                }