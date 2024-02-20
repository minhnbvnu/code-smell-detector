function createParenthesis(elementsToPak, originalElement) {
                var replacementParen, j;
                if (elementsToPak.length === 0) {
                    replacementParen = new paren_1.default(elementsToPak[0]);
                }
                else {
                    var insideParent = new Array(elementsToPak.length);
                    for (j = 0; j < elementsToPak.length; j++) {
                        insideParent[j] = new element_1.default(null, elementsToPak[j], originalElement.isVariable, originalElement._index, originalElement._fileInfo);
                    }
                    replacementParen = new paren_1.default(new selector_1.default(insideParent));
                }
                return replacementParen;
            }