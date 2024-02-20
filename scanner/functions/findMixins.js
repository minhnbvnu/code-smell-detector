function findMixins(types) {
                const constructorTypeCount = countWhere(types, (t) => getSignaturesOfType(t, 1 /* Construct */).length > 0);
                const mixinFlags = map(types, isMixinConstructorType);
                if (constructorTypeCount > 0 && constructorTypeCount === countWhere(mixinFlags, (b) => b)) {
                    const firstMixinIndex = mixinFlags.indexOf(
                    /*searchElement*/
                    true);
                    mixinFlags[firstMixinIndex] = false;
                }
                return mixinFlags;
            }