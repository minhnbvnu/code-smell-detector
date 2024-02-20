function optionalChainContainsReference(source, target) {
                while (isOptionalChain(source)) {
                    source = source.expression;
                    if (isMatchingReference(source, target)) {
                        return true;
                    }
                }
                return false;
            }