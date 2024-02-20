function isEffectiveStrictModeSourceFile(node, compilerOptions) {
            switch (node.scriptKind) {
                case 1 /* JS */:
                case 3 /* TS */:
                case 2 /* JSX */:
                case 4 /* TSX */:
                    break;
                default:
                    return false;
            }
            if (node.isDeclarationFile) {
                return false;
            }
            if (getStrictOptionValue(compilerOptions, "alwaysStrict")) {
                return true;
            }
            if (startsWithUseStrict(node.statements)) {
                return true;
            }
            if (isExternalModule(node) || getIsolatedModules(compilerOptions)) {
                if (getEmitModuleKind(compilerOptions) >= 5 /* ES2015 */) {
                    return true;
                }
                return !compilerOptions.noImplicitUseStrict;
            }
            return false;
        }