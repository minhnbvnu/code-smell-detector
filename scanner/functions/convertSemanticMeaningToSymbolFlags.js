function convertSemanticMeaningToSymbolFlags(meaning) {
            let flags = 0;
            if (meaning & 4 /* Namespace */) {
                flags |= 1920 /* Namespace */;
            }
            if (meaning & 2 /* Type */) {
                flags |= 788968 /* Type */;
            }
            if (meaning & 1 /* Value */) {
                flags |= 111551 /* Value */;
            }
            return flags;
        }