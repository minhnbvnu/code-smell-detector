function getAnnotatedAccessorTypeNode(accessor) {
                if (accessor) {
                    switch (accessor.kind) {
                        case 174 /* GetAccessor */:
                            const getterTypeAnnotation = getEffectiveReturnTypeNode(accessor);
                            return getterTypeAnnotation;
                        case 175 /* SetAccessor */:
                            const setterTypeAnnotation = getEffectiveSetAccessorTypeAnnotationNode(accessor);
                            return setterTypeAnnotation;
                        case 169 /* PropertyDeclaration */:
                            Debug.assert(hasAccessorModifier(accessor));
                            const accessorTypeAnnotation = getEffectiveTypeAnnotationNode(accessor);
                            return accessorTypeAnnotation;
                    }
                }
                return void 0;
            }