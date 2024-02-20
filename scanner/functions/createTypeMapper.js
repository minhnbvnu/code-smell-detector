function createTypeMapper(sources, targets) {
                return sources.length === 1 ? makeUnaryTypeMapper(sources[0], targets ? targets[0] : anyType) : makeArrayTypeMapper(sources, targets);
            }