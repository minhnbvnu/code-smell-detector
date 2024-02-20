function makeChange2(changeTracker, sourceFile, insertionSite, fixedDeclarations) {
            if (fixedDeclarations) {
                if (fixedDeclarations.has(getNodeId(insertionSite))) {
                    return;
                }
            }
            fixedDeclarations == null ? void 0 : fixedDeclarations.add(getNodeId(insertionSite));
            const cloneWithModifier = factory.updateModifiers(getSynthesizedDeepClone(insertionSite, 
            /*includeTrivia*/
            true), factory.createNodeArray(factory.createModifiersFromModifierFlags(getSyntacticModifierFlags(insertionSite) | 512 /* Async */)));
            changeTracker.replaceNode(sourceFile, insertionSite, cloneWithModifier);
        }