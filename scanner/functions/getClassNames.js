function getClassNames(constructorDeclaration) {
            switch (constructorDeclaration.parent.kind) {
                case 260 /* ClassDeclaration */:
                    const classDeclaration = constructorDeclaration.parent;
                    if (classDeclaration.name)
                        return [classDeclaration.name];
                    const defaultModifier = Debug.checkDefined(findModifier(classDeclaration, 88 /* DefaultKeyword */), "Nameless class declaration should be a default export");
                    return [defaultModifier];
                case 228 /* ClassExpression */:
                    const classExpression = constructorDeclaration.parent;
                    const variableDeclaration = constructorDeclaration.parent.parent;
                    const className = classExpression.name;
                    if (className)
                        return [className, variableDeclaration.name];
                    return [variableDeclaration.name];
            }
        }