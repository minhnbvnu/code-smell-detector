function createESDecorateClassContextObject(contextIn) {
                return factory2.createObjectLiteralExpression([
                    factory2.createPropertyAssignment(factory2.createIdentifier("kind"), factory2.createStringLiteral("class")),
                    factory2.createPropertyAssignment(factory2.createIdentifier("name"), contextIn.name)
                ]);
            }