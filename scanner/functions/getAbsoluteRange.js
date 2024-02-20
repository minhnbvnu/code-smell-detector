function getAbsoluteRange(jsdocComment, parsedJsdocNode) {
                return {
                    start: sourceCode.getLocFromIndex(jsdocComment.range[0] + 2 + parsedJsdocNode.range[0]),
                    end: sourceCode.getLocFromIndex(jsdocComment.range[0] + 2 + parsedJsdocNode.range[1])
                };
            }