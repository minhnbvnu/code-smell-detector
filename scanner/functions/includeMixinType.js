function includeMixinType(type, types, mixinFlags, index) {
                const mixedTypes = [];
                for (let i = 0; i < types.length; i++) {
                    if (i === index) {
                        mixedTypes.push(type);
                    }
                    else if (mixinFlags[i]) {
                        mixedTypes.push(getReturnTypeOfSignature(getSignaturesOfType(types[i], 1 /* Construct */)[0]));
                    }
                }
                return getIntersectionType(mixedTypes);
            }