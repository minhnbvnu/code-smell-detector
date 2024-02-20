function isStaticPropertyDeclaration(member) {
            return isPropertyDeclaration(member) && hasStaticModifier(member);
        }