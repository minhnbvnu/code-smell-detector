function createSelector(containedElement, originalElement) {
                var element, selector;
                element = new element_1.default(null, containedElement, originalElement.isVariable, originalElement._index, originalElement._fileInfo);
                selector = new selector_1.default([element]);
                return selector;
            }