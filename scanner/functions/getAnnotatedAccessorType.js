function getAnnotatedAccessorType(accessor) {
                const node = getAnnotatedAccessorTypeNode(accessor);
                return node && getTypeFromTypeNode(node);
            }