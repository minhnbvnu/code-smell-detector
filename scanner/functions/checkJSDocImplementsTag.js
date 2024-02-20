function checkJSDocImplementsTag(node) {
                const classLike = getEffectiveJSDocHost(node);
                if (!classLike || !isClassDeclaration(classLike) && !isClassExpression(classLike)) {
                    error(classLike, Diagnostics.JSDoc_0_is_not_attached_to_a_class, idText(node.tagName));
                }
            }