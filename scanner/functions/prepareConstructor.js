function prepareConstructor(_parent, classInfo2) {
                if (classInfo2.instanceExtraInitializersName && !classInfo2.hasNonAmbientInstanceFields) {
                    const statements = [];
                    statements.push(factory2.createExpressionStatement(emitHelpers().createRunInitializersHelper(factory2.createThis(), classInfo2.instanceExtraInitializersName)));
                    return statements;
                }
            }