function getPropagatingFlagsOfTypes(types, excludeKinds) {
                let result = 0;
                for (const type of types) {
                    if (excludeKinds === void 0 || !(type.flags & excludeKinds)) {
                        result |= getObjectFlags(type);
                    }
                }
                return result & 458752 /* PropagatingFlags */;
            }