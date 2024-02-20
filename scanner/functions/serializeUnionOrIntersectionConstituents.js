function serializeUnionOrIntersectionConstituents(types, isIntersection) {
                let serializedType;
                for (let typeNode of types) {
                    typeNode = skipTypeParentheses(typeNode);
                    if (typeNode.kind === 144 /* NeverKeyword */) {
                        if (isIntersection)
                            return factory.createVoidZero();
                        continue;
                    }
                    if (typeNode.kind === 157 /* UnknownKeyword */) {
                        if (!isIntersection)
                            return factory.createIdentifier("Object");
                        continue;
                    }
                    if (typeNode.kind === 131 /* AnyKeyword */) {
                        return factory.createIdentifier("Object");
                    }
                    if (!strictNullChecks && (isLiteralTypeNode(typeNode) && typeNode.literal.kind === 104 /* NullKeyword */ || typeNode.kind === 155 /* UndefinedKeyword */)) {
                        continue;
                    }
                    const serializedConstituent = serializeTypeNode(typeNode);
                    if (isIdentifier(serializedConstituent) && serializedConstituent.escapedText === "Object") {
                        return serializedConstituent;
                    }
                    if (serializedType) {
                        if (!equateSerializedTypeNodes(serializedType, serializedConstituent)) {
                            return factory.createIdentifier("Object");
                        }
                    }
                    else {
                        serializedType = serializedConstituent;
                    }
                }
                return serializedType != null ? serializedType : factory.createVoidZero();
            }