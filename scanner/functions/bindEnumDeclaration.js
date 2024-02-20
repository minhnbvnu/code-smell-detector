function bindEnumDeclaration(node) {
                return isEnumConst(node) ? bindBlockScopedDeclaration(node, 128 /* ConstEnum */, 899967 /* ConstEnumExcludes */) : bindBlockScopedDeclaration(node, 256 /* RegularEnum */, 899327 /* RegularEnumExcludes */);
            }