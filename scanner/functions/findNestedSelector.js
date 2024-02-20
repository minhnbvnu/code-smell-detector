function findNestedSelector(element) {
                    var maybeSelector;
                    if (!(element.value instanceof paren_1.default)) {
                        return null;
                    }
                    maybeSelector = element.value.value;
                    if (!(maybeSelector instanceof selector_1.default)) {
                        return null;
                    }
                    return maybeSelector;
                }