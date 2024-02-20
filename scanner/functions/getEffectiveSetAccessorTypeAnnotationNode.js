function getEffectiveSetAccessorTypeAnnotationNode(node) {
            const parameter = getSetAccessorValueParameter(node);
            return parameter && getEffectiveTypeAnnotationNode(parameter);
        }