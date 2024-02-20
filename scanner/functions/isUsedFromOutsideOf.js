function isUsedFromOutsideOf(scopeNode) {
        /**
         * Checks whether a given reference is inside of the specified scope or not.
         * @param {eslint-scope.Reference} reference A reference to check.
         * @returns {boolean} `true` if the reference is inside of the specified
         *      scope.
         */
        function isOutsideOfScope(reference) {
            const scope = scopeNode.range;
            const id = reference.identifier.range;
            return id[0] < scope[0] || id[1] > scope[1];
        }
        return function (variable) {
            return variable.references.some(isOutsideOfScope);
        };
    }