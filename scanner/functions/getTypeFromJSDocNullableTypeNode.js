function getTypeFromJSDocNullableTypeNode(node) {
                const type = getTypeFromTypeNode(node.type);
                return strictNullChecks ? getNullableType(type, 65536 /* Null */) : type;
            }