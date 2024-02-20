function checkJSDocAugmentsTag(node) {
                const classLike = getEffectiveJSDocHost(node);
                if (!classLike || !isClassDeclaration(classLike) && !isClassExpression(classLike)) {
                    error(classLike, Diagnostics.JSDoc_0_is_not_attached_to_a_class, idText(node.tagName));
                    return;
                }
                const augmentsTags = getJSDocTags(classLike).filter(isJSDocAugmentsTag);
                Debug.assert(augmentsTags.length > 0);
                if (augmentsTags.length > 1) {
                    error(augmentsTags[1], Diagnostics.Class_declarations_cannot_have_more_than_one_augments_or_extends_tag);
                }
                const name = getIdentifierFromEntityNameExpression(node.class.expression);
                const extend2 = getClassExtendsHeritageElement(classLike);
                if (extend2) {
                    const className = getIdentifierFromEntityNameExpression(extend2.expression);
                    if (className && name.escapedText !== className.escapedText) {
                        error(name, Diagnostics.JSDoc_0_1_does_not_match_the_extends_2_clause, idText(node.tagName), idText(name), idText(className));
                    }
                }
            }