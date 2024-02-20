function shouldReallyMerge(a, b, parent2) {
            if (a.kind !== b.kind || a.parent !== b.parent && !(isOwnChild(a, parent2) && isOwnChild(b, parent2))) {
                return false;
            }
            switch (a.kind) {
                case 169 /* PropertyDeclaration */:
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                    return isStatic(a) === isStatic(b);
                case 264 /* ModuleDeclaration */:
                    return areSameModule(a, b) && getFullyQualifiedModuleName(a) === getFullyQualifiedModuleName(b);
                default:
                    return true;
            }
        }