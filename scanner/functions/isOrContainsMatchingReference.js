function isOrContainsMatchingReference(source, target) {
                return isMatchingReference(source, target) || containsMatchingReference(source, target);
            }