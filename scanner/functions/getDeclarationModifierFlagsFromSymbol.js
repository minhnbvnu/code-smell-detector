function getDeclarationModifierFlagsFromSymbol(s, isWrite = false) {
            if (s.valueDeclaration) {
                const declaration = isWrite && s.declarations && find(s.declarations, isSetAccessorDeclaration) || s.flags & 32768 /* GetAccessor */ && find(s.declarations, isGetAccessorDeclaration) || s.valueDeclaration;
                const flags = getCombinedModifierFlags(declaration);
                return s.parent && s.parent.flags & 32 /* Class */ ? flags : flags & ~28 /* AccessibilityModifier */;
            }
            if (getCheckFlags(s) & 6 /* Synthetic */) {
                const checkFlags = s.links.checkFlags;
                const accessModifier = checkFlags & 1024 /* ContainsPrivate */ ? 8 /* Private */ : checkFlags & 256 /* ContainsPublic */ ? 4 /* Public */ : 16 /* Protected */;
                const staticModifier = checkFlags & 2048 /* ContainsStatic */ ? 32 /* Static */ : 0;
                return accessModifier | staticModifier;
            }
            if (s.flags & 4194304 /* Prototype */) {
                return 4 /* Public */ | 32 /* Static */;
            }
            return 0;
        }