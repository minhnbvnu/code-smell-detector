function getRestTypeAtPosition(source, pos) {
                const parameterCount = getParameterCount(source);
                const minArgumentCount = getMinArgumentCount(source);
                const restType = getEffectiveRestType(source);
                if (restType && pos >= parameterCount - 1) {
                    return pos === parameterCount - 1 ? restType : createArrayType(getIndexedAccessType(restType, numberType));
                }
                const types = [];
                const flags = [];
                const names = [];
                for (let i = pos; i < parameterCount; i++) {
                    if (!restType || i < parameterCount - 1) {
                        types.push(getTypeAtPosition(source, i));
                        flags.push(i < minArgumentCount ? 1 /* Required */ : 2 /* Optional */);
                    }
                    else {
                        types.push(restType);
                        flags.push(8 /* Variadic */);
                    }
                    const name = getNameableDeclarationAtPosition(source, i);
                    if (name) {
                        names.push(name);
                    }
                }
                return createTupleType(types, flags, 
                /*readonly*/
                false, length(names) === length(types) ? names : void 0);
            }