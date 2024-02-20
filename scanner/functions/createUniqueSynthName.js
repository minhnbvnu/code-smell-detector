function createUniqueSynthName(prevArgName) {
            const renamedPrevArg = factory.createUniqueName(prevArgName.identifier.text, 16 /* Optimistic */);
            return createSynthIdentifier(renamedPrevArg);
        }