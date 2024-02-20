function emitModuleKindIsNonNodeESM(moduleKind) {
            return moduleKind >= 5 /* ES2015 */ && moduleKind <= 99 /* ESNext */;
        }