function containsOnlyAmbientModules(sourceFile) {
                        for (const statement of sourceFile.statements) {
                            if (!isModuleWithStringLiteralName(statement)) {
                                return false;
                            }
                        }
                        return true;
                    }