function injectClassElementTypeMetadata(modifiers, node, container) {
                if (isClassLike(container) && classElementOrClassElementParameterIsDecorated(legacyDecorators, node, container)) {
                    const metadata = getTypeMetadata(node, container);
                    if (some(metadata)) {
                        const modifiersArray = [];
                        addRange(modifiersArray, filter(modifiers, isDecorator));
                        addRange(modifiersArray, metadata);
                        addRange(modifiersArray, filter(modifiers, isModifier));
                        modifiers = setTextRange(factory2.createNodeArray(modifiersArray), modifiers);
                    }
                }
                return modifiers;
            }