function checkJsDoc(node) {
                const jsdocComment = source.getJSDocComment(node);
                if (!jsdocComment) {
                    report(node);
                }
            }