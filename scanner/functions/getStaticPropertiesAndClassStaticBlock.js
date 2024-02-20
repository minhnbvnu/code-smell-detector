function getStaticPropertiesAndClassStaticBlock(node) {
            return filter(node.members, isStaticPropertyDeclarationOrClassStaticBlockDeclaration);
        }