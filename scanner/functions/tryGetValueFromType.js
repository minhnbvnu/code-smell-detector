function tryGetValueFromType(context, checker, importAdder, quotePreference, type, enclosingDeclaration) {
            if (type.flags & 3 /* AnyOrUnknown */) {
                return createUndefined();
            }
            if (type.flags & (4 /* String */ | 134217728 /* TemplateLiteral */)) {
                return factory.createStringLiteral("", 
                /* isSingleQuote */
                quotePreference === 0 /* Single */);
            }
            if (type.flags & 8 /* Number */) {
                return factory.createNumericLiteral(0);
            }
            if (type.flags & 64 /* BigInt */) {
                return factory.createBigIntLiteral("0n");
            }
            if (type.flags & 16 /* Boolean */) {
                return factory.createFalse();
            }
            if (type.flags & 1056 /* EnumLike */) {
                const enumMember = type.symbol.exports ? firstOrUndefinedIterator(type.symbol.exports.values()) : type.symbol;
                const name = checker.symbolToExpression(type.symbol.parent ? type.symbol.parent : type.symbol, 111551 /* Value */, 
                /*enclosingDeclaration*/
                void 0, 
                /*flags*/
                void 0);
                return enumMember === void 0 || name === void 0 ? factory.createNumericLiteral(0) : factory.createPropertyAccessExpression(name, checker.symbolToString(enumMember));
            }
            if (type.flags & 256 /* NumberLiteral */) {
                return factory.createNumericLiteral(type.value);
            }
            if (type.flags & 2048 /* BigIntLiteral */) {
                return factory.createBigIntLiteral(type.value);
            }
            if (type.flags & 128 /* StringLiteral */) {
                return factory.createStringLiteral(type.value, 
                /* isSingleQuote */
                quotePreference === 0 /* Single */);
            }
            if (type.flags & 512 /* BooleanLiteral */) {
                return type === checker.getFalseType() || type === checker.getFalseType(
                /*fresh*/
                true) ? factory.createFalse() : factory.createTrue();
            }
            if (type.flags & 65536 /* Null */) {
                return factory.createNull();
            }
            if (type.flags & 1048576 /* Union */) {
                const expression = firstDefined(type.types, (t) => tryGetValueFromType(context, checker, importAdder, quotePreference, t, enclosingDeclaration));
                return expression != null ? expression : createUndefined();
            }
            if (checker.isArrayLikeType(type)) {
                return factory.createArrayLiteralExpression();
            }
            if (isObjectLiteralType(type)) {
                const props = map(checker.getPropertiesOfType(type), (prop) => {
                    const initializer = tryGetValueFromType(context, checker, importAdder, quotePreference, checker.getTypeOfSymbol(prop), enclosingDeclaration);
                    return factory.createPropertyAssignment(prop.name, initializer);
                });
                return factory.createObjectLiteralExpression(props, 
                /*multiLine*/
                true);
            }
            if (getObjectFlags(type) & 16 /* Anonymous */) {
                const decl = find(type.symbol.declarations || emptyArray, or(isFunctionTypeNode, isMethodSignature, isMethodDeclaration));
                if (decl === void 0)
                    return createUndefined();
                const signature = checker.getSignaturesOfType(type, 0 /* Call */);
                if (signature === void 0)
                    return createUndefined();
                const func = createSignatureDeclarationFromSignature(215 /* FunctionExpression */, context, quotePreference, signature[0], createStubbedBody(Diagnostics.Function_not_implemented.message, quotePreference), 
                /*name*/
                void 0, 
                /*modifiers*/
                void 0, 
                /*optional*/
                void 0, 
                /*enclosingDeclaration*/
                enclosingDeclaration, importAdder);
                return func != null ? func : createUndefined();
            }
            if (getObjectFlags(type) & 1 /* Class */) {
                const classDeclaration = getClassLikeDeclarationOfSymbol(type.symbol);
                if (classDeclaration === void 0 || hasAbstractModifier(classDeclaration))
                    return createUndefined();
                const constructorDeclaration = getFirstConstructorWithBody(classDeclaration);
                if (constructorDeclaration && length(constructorDeclaration.parameters))
                    return createUndefined();
                return factory.createNewExpression(factory.createIdentifier(type.symbol.name), 
                /*typeArguments*/
                void 0, 
                /*argumentsArray*/
                void 0);
            }
            return createUndefined();
        }