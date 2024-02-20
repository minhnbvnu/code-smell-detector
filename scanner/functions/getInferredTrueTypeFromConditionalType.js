function getInferredTrueTypeFromConditionalType(type) {
                return type.resolvedInferredTrueType || (type.resolvedInferredTrueType = type.combinedMapper ? instantiateType(getTypeFromTypeNode(type.root.node.trueType), type.combinedMapper) : getTrueTypeFromConditionalType(type));
            }