function typeAnnotationsMatch(classProperty, constructorParameter) {
                if (!classProperty.typeAnnotation ||
                    !constructorParameter.typeAnnotation) {
                    return (classProperty.typeAnnotation === constructorParameter.typeAnnotation);
                }
                return (sourceCode.getText(classProperty.typeAnnotation) ===
                    sourceCode.getText(constructorParameter.typeAnnotation));
            }