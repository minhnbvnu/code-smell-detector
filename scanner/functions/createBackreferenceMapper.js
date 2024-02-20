function createBackreferenceMapper(context, index) {
                const forwardInferences = context.inferences.slice(index);
                return createTypeMapper(map(forwardInferences, (i) => i.typeParameter), map(forwardInferences, () => unknownType));
            }