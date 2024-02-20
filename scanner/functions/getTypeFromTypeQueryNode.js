function getTypeFromTypeQueryNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    const type = checkExpressionWithTypeArguments(node);
                    links.resolvedType = getRegularTypeOfLiteralType(getWidenedType(type));
                }
                return links.resolvedType;
            }