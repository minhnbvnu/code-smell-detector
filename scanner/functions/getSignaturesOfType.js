function getSignaturesOfType(type, kind) {
                return getSignaturesOfStructuredType(getReducedApparentType(type), kind);
            }