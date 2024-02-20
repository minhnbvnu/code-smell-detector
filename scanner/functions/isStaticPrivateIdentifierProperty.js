function isStaticPrivateIdentifierProperty(s) {
                return !!s.valueDeclaration && isPrivateIdentifierClassElementDeclaration(s.valueDeclaration) && isStatic(s.valueDeclaration);
            }