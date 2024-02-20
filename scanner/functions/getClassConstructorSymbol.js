function getClassConstructorSymbol(classSymbol) {
                        return classSymbol.members && classSymbol.members.get("__constructor" /* Constructor */);
                    }