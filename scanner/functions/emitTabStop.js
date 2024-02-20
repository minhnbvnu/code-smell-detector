function emitTabStop(hint, node, snippet) {
                Debug.assert(node.kind === 239 /* EmptyStatement */, `A tab stop cannot be attached to a node of kind ${Debug.formatSyntaxKind(node.kind)}.`);
                Debug.assert(hint !== 5 /* EmbeddedStatement */, `A tab stop cannot be attached to an embedded statement.`);
                nonEscapingWrite(`$${snippet.order}`);
            }