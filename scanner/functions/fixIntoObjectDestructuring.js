function fixIntoObjectDestructuring(fixer, node) {
                const rightNode = node.init;
                const sourceCode = context.getSourceCode();
                // Don't fix if that would remove any comments. Only comments inside `rightNode.object` can be preserved.
                if (sourceCode.getCommentsInside(node).length > sourceCode.getCommentsInside(rightNode.object).length) {
                    return null;
                }
                let objectText = sourceCode.getText(rightNode.object);
                if (astUtils.getPrecedence(rightNode.object) < PRECEDENCE_OF_ASSIGNMENT_EXPR) {
                    objectText = `(${objectText})`;
                }
                return fixer.replaceText(node, `{${rightNode.property.name}} = ${objectText}`);
            }