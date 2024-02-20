function isModuleOrEnumDeclaration(node) {
            return node.kind === 264 /* ModuleDeclaration */ || node.kind === 263 /* EnumDeclaration */;
        }