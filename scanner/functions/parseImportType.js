function parseImportType() {
                        sourceFlags |= 2097152 /* PossiblyContainsDynamicImport */;
                        const pos = getNodePos();
                        const isTypeOf = parseOptional(112 /* TypeOfKeyword */);
                        parseExpected(100 /* ImportKeyword */);
                        parseExpected(20 /* OpenParenToken */);
                        const type = parseType();
                        let assertions;
                        if (parseOptional(27 /* CommaToken */)) {
                            assertions = parseImportTypeAssertions();
                        }
                        parseExpected(21 /* CloseParenToken */);
                        const qualifier = parseOptional(24 /* DotToken */) ? parseEntityNameOfTypeReference() : void 0;
                        const typeArguments = parseTypeArgumentsOfTypeReference();
                        return finishNode(factory2.createImportTypeNode(type, assertions, qualifier, typeArguments, isTypeOf), pos);
                    }