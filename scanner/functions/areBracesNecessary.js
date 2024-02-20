function areBracesNecessary(node) {
                const statement = node.body[0];
                return isLexicalDeclaration(statement) ||
                    hasUnsafeIf(statement) && isFollowedByElseKeyword(node);
            }