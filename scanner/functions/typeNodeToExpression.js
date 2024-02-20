function typeNodeToExpression(typeNode, languageVersion, quotePreference) {
            switch (typeNode.kind) {
                case 180 /* TypeReference */:
                    const typeName = typeNode.typeName;
                    return entityNameToExpression(typeName, languageVersion, quotePreference);
                case 196 /* IndexedAccessType */:
                    const objectExpression = typeNodeToExpression(typeNode.objectType, languageVersion, quotePreference);
                    const indexExpression = typeNodeToExpression(typeNode.indexType, languageVersion, quotePreference);
                    return objectExpression && indexExpression && factory.createElementAccessExpression(objectExpression, indexExpression);
                case 198 /* LiteralType */:
                    const literal = typeNode.literal;
                    switch (literal.kind) {
                        case 10 /* StringLiteral */:
                            return factory.createStringLiteral(literal.text, quotePreference === 0 /* Single */);
                        case 8 /* NumericLiteral */:
                            return factory.createNumericLiteral(literal.text, literal.numericLiteralFlags);
                    }
                    return void 0;
                case 193 /* ParenthesizedType */:
                    const exp = typeNodeToExpression(typeNode.type, languageVersion, quotePreference);
                    return exp && (isIdentifier(exp) ? exp : factory.createParenthesizedExpression(exp));
                case 183 /* TypeQuery */:
                    return entityNameToExpression(typeNode.exprName, languageVersion, quotePreference);
                case 202 /* ImportType */:
                    Debug.fail(`We should not get an import type after calling 'codefix.typeToAutoImportableTypeNode'.`);
            }
            return void 0;
        }