function parenthesizeOrdinalTypeArgument(node, i) {
                return i === 0 ? parenthesizeLeadingTypeArgument(node) : node;
            }