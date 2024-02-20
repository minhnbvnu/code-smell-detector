function isPurelyTypeDeclaration(s) {
            switch (s.kind) {
                case 261 /* InterfaceDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                    return true;
                case 264 /* ModuleDeclaration */:
                    return getModuleInstanceState(s) !== 1 /* Instantiated */;
                case 263 /* EnumDeclaration */:
                    return hasSyntacticModifier(s, 2048 /* Const */);
                default:
                    return false;
            }
        }