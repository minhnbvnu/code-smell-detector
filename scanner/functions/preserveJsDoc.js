function preserveJsDoc(updated, original) {
                if (hasJSDocNodes(updated) && hasJSDocNodes(original)) {
                    updated.jsDoc = original.jsDoc;
                }
                return setCommentRange(updated, getCommentRange(original));
            }