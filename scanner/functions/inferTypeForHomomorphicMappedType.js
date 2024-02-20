function inferTypeForHomomorphicMappedType(source, target, constraint) {
                if (inInferTypeForHomomorphicMappedType) {
                    return void 0;
                }
                const key = source.id + "," + target.id + "," + constraint.id;
                if (reverseMappedCache.has(key)) {
                    return reverseMappedCache.get(key);
                }
                inInferTypeForHomomorphicMappedType = true;
                const type = createReverseMappedType(source, target, constraint);
                inInferTypeForHomomorphicMappedType = false;
                reverseMappedCache.set(key, type);
                return type;
            }