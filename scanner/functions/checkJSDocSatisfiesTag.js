function checkJSDocSatisfiesTag(node) {
                checkSourceElement(node.typeExpression);
                const host2 = getEffectiveJSDocHost(node);
                if (host2) {
                    const tags = getAllJSDocTags(host2, isJSDocSatisfiesTag);
                    if (length(tags) > 1) {
                        for (let i = 1; i < length(tags); i++) {
                            const tagName = tags[i].tagName;
                            error(tagName, Diagnostics._0_tag_already_specified, idText(tagName));
                        }
                    }
                }
            }