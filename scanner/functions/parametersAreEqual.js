function parametersAreEqual(a, b) {
                const typeAnnotationA = isTSParameterProperty(a)
                    ? a.parameter.typeAnnotation
                    : a.typeAnnotation;
                const typeAnnotationB = isTSParameterProperty(b)
                    ? b.parameter.typeAnnotation
                    : b.typeAnnotation;
                return (parametersHaveEqualSigils(a, b) &&
                    typesAreEqual(typeAnnotationA, typeAnnotationB));
            }