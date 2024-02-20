function getAssignedNameOfIdentifier(name, initializer) {
                const originalClass = getOriginalNode(initializer, isClassLike);
                return originalClass && !originalClass.name && hasSyntacticModifier(originalClass, 1024 /* Default */) ? factory2.createStringLiteral("default") : factory2.createStringLiteralFromNode(name);
            }