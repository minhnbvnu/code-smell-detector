function isNodeDescendantOfRestElementInFunction(node) {
                return (isGreatGrandparentRestElement(node) ||
                    isGreatGreatGrandparentRestElement(node));
            }