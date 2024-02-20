function checkJSDocTemplateTag(node) {
                checkSourceElement(node.constraint);
                for (const tp of node.typeParameters) {
                    checkSourceElement(tp);
                }
            }