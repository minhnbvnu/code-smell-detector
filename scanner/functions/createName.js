function createName(node) {
                if (isIdentifier(node) && node.escapedText === "constructor") {
                    return factory.createComputedPropertyName(factory.createStringLiteral(idText(node), quotePreference === 0 /* Single */));
                }
                return getSynthesizedDeepClone(node, 
                /*includeTrivia*/
                false);
            }