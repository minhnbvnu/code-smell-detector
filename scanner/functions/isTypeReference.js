function isTypeReference(reference) {
        return (reference.isTypeReference ||
            referenceContainsTypeQuery(reference.identifier));
    }