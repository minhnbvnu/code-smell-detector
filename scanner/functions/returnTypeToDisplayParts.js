function returnTypeToDisplayParts(candidateSignature, enclosingDeclaration, checker) {
            return mapToDisplayParts((writer) => {
                writer.writePunctuation(":");
                writer.writeSpace(" ");
                const predicate = checker.getTypePredicateOfSignature(candidateSignature);
                if (predicate) {
                    checker.writeTypePredicate(predicate, enclosingDeclaration, 
                    /*flags*/
                    void 0, writer);
                }
                else {
                    checker.writeType(checker.getReturnTypeOfSignature(candidateSignature), enclosingDeclaration, 
                    /*flags*/
                    void 0, writer);
                }
            });
        }