function getDefaultValueFromType(checker, type) {
            if (type.flags & 512 /* BooleanLiteral */) {
                return type === checker.getFalseType() || type === checker.getFalseType(
                /*fresh*/
                true) ? factory.createFalse() : factory.createTrue();
            }
            else if (type.isStringLiteral()) {
                return factory.createStringLiteral(type.value);
            }
            else if (type.isNumberLiteral()) {
                return factory.createNumericLiteral(type.value);
            }
            else if (type.flags & 2048 /* BigIntLiteral */) {
                return factory.createBigIntLiteral(type.value);
            }
            else if (type.isUnion()) {
                return firstDefined(type.types, (t) => getDefaultValueFromType(checker, t));
            }
            else if (type.isClass()) {
                const classDeclaration = getClassLikeDeclarationOfSymbol(type.symbol);
                if (!classDeclaration || hasSyntacticModifier(classDeclaration, 256 /* Abstract */))
                    return void 0;
                const constructorDeclaration = getFirstConstructorWithBody(classDeclaration);
                if (constructorDeclaration && constructorDeclaration.parameters.length)
                    return void 0;
                return factory.createNewExpression(factory.createIdentifier(type.symbol.name), 
                /*typeArguments*/
                void 0, 
                /*argumentsArray*/
                void 0);
            }
            else if (checker.isArrayLikeType(type)) {
                return factory.createArrayLiteralExpression();
            }
            return void 0;
        }