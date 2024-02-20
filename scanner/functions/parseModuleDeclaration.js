function parseModuleDeclaration(pos, hasJSDoc, modifiersIn) {
                        let flags = 0;
                        if (token() === 159 /* GlobalKeyword */) {
                            return parseAmbientExternalModuleDeclaration(pos, hasJSDoc, modifiersIn);
                        }
                        else if (parseOptional(143 /* NamespaceKeyword */)) {
                            flags |= 16 /* Namespace */;
                        }
                        else {
                            parseExpected(142 /* ModuleKeyword */);
                            if (token() === 10 /* StringLiteral */) {
                                return parseAmbientExternalModuleDeclaration(pos, hasJSDoc, modifiersIn);
                            }
                        }
                        return parseModuleOrNamespaceDeclaration(pos, hasJSDoc, modifiersIn, flags);
                    }