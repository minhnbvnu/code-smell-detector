function getPossibleNameForVarDecl(node, transformer, continuationArgName) {
            let possibleNameForVarDecl;
            if (continuationArgName && !shouldReturn(node, transformer)) {
                if (isSynthIdentifier(continuationArgName)) {
                    possibleNameForVarDecl = continuationArgName;
                    transformer.synthNamesMap.forEach((val, key) => {
                        if (val.identifier.text === continuationArgName.identifier.text) {
                            const newSynthName = createUniqueSynthName(continuationArgName);
                            transformer.synthNamesMap.set(key, newSynthName);
                        }
                    });
                }
                else {
                    possibleNameForVarDecl = createSynthIdentifier(factory.createUniqueName("result", 16 /* Optimistic */), continuationArgName.types);
                }
                declareSynthIdentifier(possibleNameForVarDecl);
            }
            return possibleNameForVarDecl;
        }