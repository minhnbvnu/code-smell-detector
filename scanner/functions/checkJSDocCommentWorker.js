function checkJSDocCommentWorker(node) {
                if (isArray(node)) {
                    forEach(node, (tag) => {
                        if (isJSDocLinkLike(tag)) {
                            checkSourceElement(tag);
                        }
                    });
                }
            }