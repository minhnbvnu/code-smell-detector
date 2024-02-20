function getEntityNameForDecoratorMetadataFromTypeList(types) {
                let commonEntityName;
                for (let typeNode of types) {
                    while (typeNode.kind === 193 /* ParenthesizedType */ || typeNode.kind === 199 /* NamedTupleMember */) {
                        typeNode = typeNode.type;
                    }
                    if (typeNode.kind === 144 /* NeverKeyword */) {
                        continue;
                    }
                    if (!strictNullChecks && (typeNode.kind === 198 /* LiteralType */ && typeNode.literal.kind === 104 /* NullKeyword */ || typeNode.kind === 155 /* UndefinedKeyword */)) {
                        continue;
                    }
                    const individualEntityName = getEntityNameForDecoratorMetadata(typeNode);
                    if (!individualEntityName) {
                        return void 0;
                    }
                    if (commonEntityName) {
                        if (!isIdentifier(commonEntityName) || !isIdentifier(individualEntityName) || commonEntityName.escapedText !== individualEntityName.escapedText) {
                            return void 0;
                        }
                    }
                    else {
                        commonEntityName = individualEntityName;
                    }
                }
                return commonEntityName;
            }