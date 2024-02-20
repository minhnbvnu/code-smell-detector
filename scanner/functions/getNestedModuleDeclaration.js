function getNestedModuleDeclaration(node) {
            return isModuleDeclaration(node) && node.body && node.body.kind === 264 /* ModuleDeclaration */ ? node.body : void 0;
        }