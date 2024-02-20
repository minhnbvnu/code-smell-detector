function findInheritedConstructorReferences(classDeclaration, state) {
                        if (hasOwnConstructor(classDeclaration))
                            return;
                        const classSymbol = classDeclaration.symbol;
                        const search = state.createSearch(
                        /*location*/
                        void 0, classSymbol, 
                        /*comingFrom*/
                        void 0);
                        getReferencesInContainerOrFiles(classSymbol, state, search);
                    }