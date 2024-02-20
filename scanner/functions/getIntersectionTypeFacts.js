function getIntersectionTypeFacts(type) {
                const ignoreObjects = maybeTypeOfKind(type, 134348796 /* Primitive */);
                let oredFacts = 0 /* None */;
                let andedFacts = 134217727 /* All */;
                for (const t of type.types) {
                    if (!(ignoreObjects && t.flags & 524288 /* Object */)) {
                        const f = getTypeFacts(t);
                        oredFacts |= f;
                        andedFacts &= f;
                    }
                }
                return oredFacts & 8256 /* OrFactsMask */ | andedFacts & 134209471 /* AndFactsMask */;
            }