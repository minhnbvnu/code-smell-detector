function arrayify(thing) {
                if (!thing) return [];
                if (thing.toArray) return thing.toArray();
                return normalizeArray(thing)
            }