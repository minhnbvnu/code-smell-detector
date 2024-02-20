function compareSpecificity(selectorA, selectorB) {
        return selectorA.attributeCount - selectorB.attributeCount ||
            selectorA.identifierCount - selectorB.identifierCount ||
            (selectorA.rawSelector <= selectorB.rawSelector ? -1 : 1);
    }