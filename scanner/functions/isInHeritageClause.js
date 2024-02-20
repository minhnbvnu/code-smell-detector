function isInHeritageClause(node) {
                    return node.parent && node.parent.kind === 230 /* ExpressionWithTypeArguments */ && node.parent.parent && node.parent.parent.kind === 294 /* HeritageClause */;
                }