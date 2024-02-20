function getSingleSignature(type, kind, allowMembers) {
                if (type.flags & 524288 /* Object */) {
                    const resolved = resolveStructuredTypeMembers(type);
                    if (allowMembers || resolved.properties.length === 0 && resolved.indexInfos.length === 0) {
                        if (kind === 0 /* Call */ && resolved.callSignatures.length === 1 && resolved.constructSignatures.length === 0) {
                            return resolved.callSignatures[0];
                        }
                        if (kind === 1 /* Construct */ && resolved.constructSignatures.length === 1 && resolved.callSignatures.length === 0) {
                            return resolved.constructSignatures[0];
                        }
                    }
                }
                return void 0;
            }