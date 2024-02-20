function getServicesObjectAllocator() {
            return {
                getNodeConstructor: () => NodeObject,
                getTokenConstructor: () => TokenObject,
                getIdentifierConstructor: () => IdentifierObject,
                getPrivateIdentifierConstructor: () => PrivateIdentifierObject,
                getSourceFileConstructor: () => SourceFileObject,
                getSymbolConstructor: () => SymbolObject,
                getTypeConstructor: () => TypeObject,
                getSignatureConstructor: () => SignatureObject,
                getSourceMapSourceConstructor: () => SourceMapSourceObject
            };
        }