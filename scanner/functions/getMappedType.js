function getMappedType(type, mapper) {
                switch (mapper.kind) {
                    case 0 /* Simple */:
                        return type === mapper.source ? mapper.target : type;
                    case 1 /* Array */: {
                        const sources = mapper.sources;
                        const targets = mapper.targets;
                        for (let i = 0; i < sources.length; i++) {
                            if (type === sources[i]) {
                                return targets ? targets[i] : anyType;
                            }
                        }
                        return type;
                    }
                    case 2 /* Deferred */: {
                        const sources = mapper.sources;
                        const targets = mapper.targets;
                        for (let i = 0; i < sources.length; i++) {
                            if (type === sources[i]) {
                                return targets[i]();
                            }
                        }
                        return type;
                    }
                    case 3 /* Function */:
                        return mapper.func(type);
                    case 4 /* Composite */:
                    case 5 /* Merged */:
                        const t1 = getMappedType(type, mapper.mapper1);
                        return t1 !== type && mapper.kind === 4 /* Composite */ ? instantiateType(t1, mapper.mapper2) : getMappedType(t1, mapper.mapper2);
                }
            }