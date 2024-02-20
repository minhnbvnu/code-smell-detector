function tryAddSingleDeclarationName(declaration, containers) {
            const name = getNameOfDeclaration(declaration);
            return !!name && (pushLiteral(name, containers) || name.kind === 164 /* ComputedPropertyName */ && tryAddComputedPropertyName(name.expression, containers));
        }