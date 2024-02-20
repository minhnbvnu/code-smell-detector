function getUniqueTypeParameters(context, typeParameters) {
                const result = [];
                let oldTypeParameters;
                let newTypeParameters;
                for (const tp of typeParameters) {
                    const name = tp.symbol.escapedName;
                    if (hasTypeParameterByName(context.inferredTypeParameters, name) || hasTypeParameterByName(result, name)) {
                        const newName = getUniqueTypeParameterName(concatenate(context.inferredTypeParameters, result), name);
                        const symbol = createSymbol(262144 /* TypeParameter */, newName);
                        const newTypeParameter = createTypeParameter(symbol);
                        newTypeParameter.target = tp;
                        oldTypeParameters = append(oldTypeParameters, tp);
                        newTypeParameters = append(newTypeParameters, newTypeParameter);
                        result.push(newTypeParameter);
                    }
                    else {
                        result.push(tp);
                    }
                }
                if (newTypeParameters) {
                    const mapper = createTypeMapper(oldTypeParameters, newTypeParameters);
                    for (const tp of newTypeParameters) {
                        tp.mapper = mapper;
                    }
                }
                return result;
            }