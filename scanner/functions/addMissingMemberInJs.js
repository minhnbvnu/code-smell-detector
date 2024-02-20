function addMissingMemberInJs(changeTracker, sourceFile, classDeclaration, token, makeStatic) {
            const tokenName = token.text;
            if (makeStatic) {
                if (classDeclaration.kind === 228 /* ClassExpression */) {
                    return;
                }
                const className = classDeclaration.name.getText();
                const staticInitialization = initializePropertyToUndefined(factory.createIdentifier(className), tokenName);
                changeTracker.insertNodeAfter(sourceFile, classDeclaration, staticInitialization);
            }
            else if (isPrivateIdentifier(token)) {
                const property = factory.createPropertyDeclaration(
                /*modifiers*/
                void 0, tokenName, 
                /*questionToken*/
                void 0, 
                /*type*/
                void 0, 
                /*initializer*/
                void 0);
                const lastProp = getNodeToInsertPropertyAfter(classDeclaration);
                if (lastProp) {
                    changeTracker.insertNodeAfter(sourceFile, lastProp, property);
                }
                else {
                    changeTracker.insertMemberAtStart(sourceFile, classDeclaration, property);
                }
            }
            else {
                const classConstructor = getFirstConstructorWithBody(classDeclaration);
                if (!classConstructor) {
                    return;
                }
                const propertyInitialization = initializePropertyToUndefined(factory.createThis(), tokenName);
                changeTracker.insertNodeAtConstructorEnd(sourceFile, classConstructor, propertyInitialization);
            }
        }