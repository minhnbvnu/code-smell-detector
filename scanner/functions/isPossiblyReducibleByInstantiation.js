function isPossiblyReducibleByInstantiation(type) {
                const uniqueFilled = getUniqueLiteralFilledInstantiation(type);
                return getReducedType(uniqueFilled) !== uniqueFilled;
            }