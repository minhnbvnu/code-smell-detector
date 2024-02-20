function isEvaluatedDuringInitialization(reference) {
        if (isFromSeparateExecutionContext(reference)) {
            /*
             * Even if the reference appears in the initializer, it isn't evaluated during the initialization.
             * For example, `const x = () => x;` is valid.
             */
            return false;
        }
        const location = reference.identifier.range[1];
        const definition = reference.resolved.defs[0];
        if (definition.type === "ClassName") {
            // `ClassDeclaration` or `ClassExpression`
            const classDefinition = definition.node;
            return (isInRange(classDefinition, location) &&
                /*
                 * Class binding is initialized before running static initializers.
                 * For example, `class C { static foo = C; static { bar = C; } }` is valid.
                 */
                !isInClassStaticInitializerRange(classDefinition.body, location));
        }
        let node = definition.name.parent;
        while (node) {
            if (node.type === "VariableDeclarator") {
                if (isInRange(node.init, location)) {
                    return true;
                }
                if (FOR_IN_OF_TYPE.test(node.parent.parent.type) &&
                    isInRange(node.parent.parent.right, location)) {
                    return true;
                }
                break;
            }
            else if (node.type === "AssignmentPattern") {
                if (isInRange(node.right, location)) {
                    return true;
                }
            }
            else if (SENTINEL_TYPE.test(node.type)) {
                break;
            }
            node = node.parent;
        }
        return false;
    }