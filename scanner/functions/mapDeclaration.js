function mapDeclaration(declaration) {
        return {
            declaration,
            exported: true,
            domain: getDeclarationDomain(declaration),
        };
    }