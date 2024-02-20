function handleImportCall(importCall) {
                const top = findAncestor(importCall, isAmbientModuleDeclaration) || importCall.getSourceFile();
                addIndirectUser(top, 
                /** addTransitiveDependencies */
                !!isExported2(importCall, 
                /** stopAtAmbientModule */
                true));
            }