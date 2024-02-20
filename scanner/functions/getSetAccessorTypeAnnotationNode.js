function getSetAccessorTypeAnnotationNode(accessor) {
            const parameter = getSetAccessorValueParameter(accessor);
            return parameter && parameter.type;
        }