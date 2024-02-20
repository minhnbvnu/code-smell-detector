function stringLiteralCompletionsFromProperties(type) {
            return type && {
                kind: 1 /* Properties */,
                symbols: filter(type.getApparentProperties(), (prop) => !(prop.valueDeclaration && isPrivateIdentifierClassElementDeclaration(prop.valueDeclaration))),
                hasIndexSignature: hasIndexSignature(type)
            };
        }