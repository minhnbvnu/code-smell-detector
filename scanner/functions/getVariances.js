function getVariances(type) {
                return type === globalArrayType || type === globalReadonlyArrayType || type.objectFlags & 8 /* Tuple */ ? arrayVariances : getVariancesWorker(type.symbol, type.typeParameters);
            }