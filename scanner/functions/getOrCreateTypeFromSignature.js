function getOrCreateTypeFromSignature(signature) {
                var _a2;
                if (!signature.isolatedSignatureType) {
                    const kind = (_a2 = signature.declaration) == null ? void 0 : _a2.kind;
                    const isConstructor = kind === void 0 || kind === 173 /* Constructor */ || kind === 177 /* ConstructSignature */ || kind === 182 /* ConstructorType */;
                    const type = createObjectType(16 /* Anonymous */);
                    type.members = emptySymbols;
                    type.properties = emptyArray;
                    type.callSignatures = !isConstructor ? [signature] : emptyArray;
                    type.constructSignatures = isConstructor ? [signature] : emptyArray;
                    type.indexInfos = emptyArray;
                    signature.isolatedSignatureType = type;
                }
                return signature.isolatedSignatureType;
            }