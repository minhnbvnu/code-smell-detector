function addDeclaration(declaration) {
                            const name = getDeclarationName(declaration);
                            if (name) {
                                result.add(name, declaration);
                            }
                        }