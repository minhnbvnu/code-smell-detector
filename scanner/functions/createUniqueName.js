function createUniqueName(text, flags2 = 0 /* None */, prefix, suffix) {
                Debug.assert(!(flags2 & 7 /* KindMask */), "Argument out of range: flags");
                Debug.assert((flags2 & (16 /* Optimistic */ | 32 /* FileLevel */)) !== 32 /* FileLevel */, "GeneratedIdentifierFlags.FileLevel cannot be set without also setting GeneratedIdentifierFlags.Optimistic");
                return createBaseGeneratedIdentifier(text, 3 /* Unique */ | flags2, prefix, suffix);
            }