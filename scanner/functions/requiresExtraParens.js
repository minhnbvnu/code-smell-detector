function requiresExtraParens(node) {
                return node.parent && parenthesized[node.parent.type] &&
                    node === node.parent[parenthesized[node.parent.type]];
            }