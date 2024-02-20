function createTypeParametersForArguments(checker, argumentTypeParameters, typeArguments) {
            const usedNames = new Set(argumentTypeParameters.map((pair) => pair[0]));
            const constraintsByName = new Map(argumentTypeParameters);
            if (typeArguments) {
                const typeArgumentsWithNewTypes = typeArguments.filter((typeArgument) => !argumentTypeParameters.some((pair) => {
                    var _a2;
                    return checker.getTypeAtLocation(typeArgument) === ((_a2 = pair[1]) == null ? void 0 : _a2.argumentType);
                }));
                const targetSize = usedNames.size + typeArgumentsWithNewTypes.length;
                for (let i = 0; usedNames.size < targetSize; i += 1) {
                    usedNames.add(createTypeParameterName(i));
                }
            }
            return arrayFrom(usedNames.values(), (usedName) => {
                var _a2;
                return factory.createTypeParameterDeclaration(
                /*modifiers*/
                void 0, usedName, (_a2 = constraintsByName.get(usedName)) == null ? void 0 : _a2.constraint);
            });
        }