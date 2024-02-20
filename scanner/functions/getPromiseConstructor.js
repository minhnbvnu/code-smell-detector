function getPromiseConstructor(type) {
                const typeName = type && getEntityNameFromTypeNode(type);
                if (typeName && isEntityName(typeName)) {
                    const serializationKind = resolver.getTypeReferenceSerializationKind(typeName);
                    if (serializationKind === 1 /* TypeWithConstructSignatureAndValue */ || serializationKind === 0 /* Unknown */) {
                        return typeName;
                    }
                }
                return void 0;
            }