function containsMatchingReference(source, target) {
                while (isAccessExpression(source)) {
                    source = source.expression;
                    if (isMatchingReference(source, target)) {
                        return true;
                    }
                }
                return false;
            }