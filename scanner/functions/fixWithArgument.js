function* fixWithArgument(fixer, node, callNode, calleeNode, kind, negative, isOptional) {
                if (negative) {
                    yield fixer.insertTextBefore(node, '!');
                }
                yield fixer.replaceTextRange(getPropertyRange(calleeNode), `${isOptional ? '?.' : '.'}${kind}sWith`);
                yield fixer.removeRange([callNode.range[1], node.range[1]]);
            }