function injectClassTypeMetadata(modifiers, node) {
                const metadata = getTypeMetadata(node, node);
                if (some(metadata)) {
                    const modifiersArray = [];
                    addRange(modifiersArray, takeWhile(modifiers, isExportOrDefaultModifier));
                    addRange(modifiersArray, filter(modifiers, isDecorator));
                    addRange(modifiersArray, metadata);
                    addRange(modifiersArray, filter(skipWhile(modifiers, isExportOrDefaultModifier), isModifier));
                    modifiers = setTextRange(factory2.createNodeArray(modifiersArray), modifiers);
                }
                return modifiers;
            }