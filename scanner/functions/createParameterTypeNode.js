function createParameterTypeNode(parameters) {
                const members = map(parameters, createPropertySignatureFromParameterDeclaration);
                const typeNode = addEmitFlags(factory.createTypeLiteralNode(members), 1 /* SingleLine */);
                return typeNode;
            }