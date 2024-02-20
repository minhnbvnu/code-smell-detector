function isUsingFeatureOfTemplateLiteral(node) {
                const hasTag = node.parent.type === "TaggedTemplateExpression" && node === node.parent.quasi;
                if (hasTag) {
                    return true;
                }
                const hasStringInterpolation = node.expressions.length > 0;
                if (hasStringInterpolation) {
                    return true;
                }
                const isMultilineString = node.quasis.length >= 1 && UNESCAPED_LINEBREAK_PATTERN.test(node.quasis[0].value.raw);
                if (isMultilineString) {
                    return true;
                }
                return false;
            }