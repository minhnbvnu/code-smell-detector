function createESDecorateClassElementContextObject(contextIn) {
                return factory2.createObjectLiteralExpression([
                    factory2.createPropertyAssignment(factory2.createIdentifier("kind"), factory2.createStringLiteral(contextIn.kind)),
                    factory2.createPropertyAssignment(factory2.createIdentifier("name"), contextIn.name.computed ? contextIn.name.name : factory2.createStringLiteralFromNode(contextIn.name.name)),
                    factory2.createPropertyAssignment(factory2.createIdentifier("static"), contextIn.static ? factory2.createTrue() : factory2.createFalse()),
                    factory2.createPropertyAssignment(factory2.createIdentifier("private"), contextIn.private ? factory2.createTrue() : factory2.createFalse()),
                    factory2.createPropertyAssignment(factory2.createIdentifier("access"), createESDecorateClassElementAccessObject(contextIn.name, contextIn.access))
                ]);
            }