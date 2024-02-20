function getFalseTypeFromConditionalType(type) {
                return type.resolvedFalseType || (type.resolvedFalseType = instantiateType(getTypeFromTypeNode(type.root.node.falseType), type.mapper));
            }