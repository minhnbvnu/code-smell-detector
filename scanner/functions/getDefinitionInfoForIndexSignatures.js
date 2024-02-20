function getDefinitionInfoForIndexSignatures(node, checker) {
            return mapDefined(checker.getIndexInfosAtLocation(node), (info) => info.declaration && createDefinitionFromSignatureDeclaration(checker, info.declaration));
        }