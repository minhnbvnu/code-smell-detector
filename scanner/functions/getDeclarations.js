function getDeclarations(name) {
                            let declarations = result.get(name);
                            if (!declarations) {
                                result.set(name, declarations = []);
                            }
                            return declarations;
                        }