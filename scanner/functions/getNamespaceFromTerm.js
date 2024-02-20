function getNamespaceFromTerm(term) {
        const match = term.match(NAMESPACE_REGEX);
        return match ? match[0] : "";
    }