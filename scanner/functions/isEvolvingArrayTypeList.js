function isEvolvingArrayTypeList(types) {
                let hasEvolvingArrayType = false;
                for (const t of types) {
                    if (!(t.flags & 131072 /* Never */)) {
                        if (!(getObjectFlags(t) & 256 /* EvolvingArray */)) {
                            return false;
                        }
                        hasEvolvingArrayType = true;
                    }
                }
                return hasEvolvingArrayType;
            }