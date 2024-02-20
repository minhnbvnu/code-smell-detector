function getNameOfDeclaration(declaration) {
            if (declaration === void 0)
                return void 0;
            return getNonAssignedNameOfDeclaration(declaration) || (isFunctionExpression(declaration) || isArrowFunction(declaration) || isClassExpression(declaration) ? getAssignedName(declaration) : void 0);
        }