function parseImportClause(identifier, pos, isTypeOnly) {
                        let namedBindings;
                        if (!identifier || parseOptional(27 /* CommaToken */)) {
                            namedBindings = token() === 41 /* AsteriskToken */ ? parseNamespaceImport() : parseNamedImportsOrExports(272 /* NamedImports */);
                        }
                        return finishNode(factory2.createImportClause(isTypeOnly, identifier, namedBindings), pos);
                    }