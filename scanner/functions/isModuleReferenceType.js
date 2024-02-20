function isModuleReferenceType(type) {
                return type.symbol && type.symbol.flags & 1536 /* Module */;
            }