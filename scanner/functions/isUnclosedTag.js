function isUnclosedTag({ openingElement, closingElement, parent: parent2 }) {
                return !tagNamesAreEquivalent(openingElement.tagName, closingElement.tagName) || isJsxElement(parent2) && tagNamesAreEquivalent(openingElement.tagName, parent2.openingElement.tagName) && isUnclosedTag(parent2);
            }