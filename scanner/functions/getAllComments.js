function getAllComments() {
                const comments = [];
                sourceCode.getAllComments()
                    .forEach(commentNode => {
                    const containingNode = sourceCode.getNodeByRangeIndex(commentNode.range[0]);
                    if (isJSXEmptyExpressionInSingleLineContainer(containingNode)) {
                        // push a unique node only
                        if (comments[comments.length - 1] !== containingNode.parent) {
                            comments.push(containingNode.parent);
                        }
                    }
                    else {
                        comments.push(commentNode);
                    }
                });
                return comments;
            }