function isModifyingReference(reference, index, references) {
        const identifier = reference.identifier;
        /*
         * Destructuring assignments can have multiple default value, so
         * possibly there are multiple writeable references for the same
         * identifier.
         */
        const modifyingDifferentIdentifier = index === 0 ||
            references[index - 1].identifier !== identifier;
        return (identifier &&
            reference.init === false &&
            reference.isWrite() &&
            modifyingDifferentIdentifier);
    }