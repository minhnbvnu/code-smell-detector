function parenthesizeExpressionsOfCommaDelimitedList(elements) {
                const result = sameMap(elements, parenthesizeExpressionForDisallowedComma);
                return setTextRange(factory2.createNodeArray(result, elements.hasTrailingComma), elements);
            }