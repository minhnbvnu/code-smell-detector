function getTrueTypeFromConditionalType(type) {
                return type.resolvedTrueType || (type.resolvedTrueType = instantiateType(getTypeFromTypeNode(type.root.node.trueType), type.mapper));
            }