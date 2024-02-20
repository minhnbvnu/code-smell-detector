function checkUnionOrIntersectionType(node) {
                forEach(node.types, checkSourceElement);
                getTypeFromTypeNode(node);
            }