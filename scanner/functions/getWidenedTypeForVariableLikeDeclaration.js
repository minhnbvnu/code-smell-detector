function getWidenedTypeForVariableLikeDeclaration(declaration, reportErrors2) {
                return widenTypeForVariableLikeDeclaration(getTypeForVariableLikeDeclaration(declaration, 
                /*includeOptionality*/
                true, 0 /* Normal */), declaration, reportErrors2);
            }