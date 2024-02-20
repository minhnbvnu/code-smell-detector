function getNewNameIfConflict(name, originalNames) {
            const numVarsSameName = (originalNames.get(name.text) || emptyArray).length;
            const identifier = numVarsSameName === 0 ? name : factory.createIdentifier(name.text + "_" + numVarsSameName);
            return createSynthIdentifier(identifier);
        }