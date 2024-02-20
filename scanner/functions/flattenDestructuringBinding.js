function flattenDestructuringBinding(node, visitor, context, level, rval, hoistTempVariables = false, skipInitializer) {
            let pendingExpressions;
            const pendingDeclarations = [];
            const declarations = [];
            const flattenContext = {
                context,
                level,
                downlevelIteration: !!context.getCompilerOptions().downlevelIteration,
                hoistTempVariables,
                emitExpression,
                emitBindingOrAssignment,
                createArrayBindingOrAssignmentPattern: (elements) => makeArrayBindingPattern(context.factory, elements),
                createObjectBindingOrAssignmentPattern: (elements) => makeObjectBindingPattern(context.factory, elements),
                createArrayBindingOrAssignmentElement: (name) => makeBindingElement(context.factory, name),
                visitor
            };
            if (isVariableDeclaration(node)) {
                let initializer = getInitializerOfBindingOrAssignmentElement(node);
                if (initializer && (isIdentifier(initializer) && bindingOrAssignmentElementAssignsToName(node, initializer.escapedText) || bindingOrAssignmentElementContainsNonLiteralComputedName(node))) {
                    initializer = ensureIdentifier(flattenContext, Debug.checkDefined(visitNode(initializer, flattenContext.visitor, isExpression)), 
                    /*reuseIdentifierExpressions*/
                    false, initializer);
                    node = context.factory.updateVariableDeclaration(node, node.name, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer);
                }
            }
            flattenBindingOrAssignmentElement(flattenContext, node, rval, node, skipInitializer);
            if (pendingExpressions) {
                const temp = context.factory.createTempVariable(
                /*recordTempVariable*/
                void 0);
                if (hoistTempVariables) {
                    const value = context.factory.inlineExpressions(pendingExpressions);
                    pendingExpressions = void 0;
                    emitBindingOrAssignment(temp, value, 
                    /*location*/
                    void 0, 
                    /*original*/
                    void 0);
                }
                else {
                    context.hoistVariableDeclaration(temp);
                    const pendingDeclaration = last(pendingDeclarations);
                    pendingDeclaration.pendingExpressions = append(pendingDeclaration.pendingExpressions, context.factory.createAssignment(temp, pendingDeclaration.value));
                    addRange(pendingDeclaration.pendingExpressions, pendingExpressions);
                    pendingDeclaration.value = temp;
                }
            }
            for (const { pendingExpressions: pendingExpressions2, name, value, location, original } of pendingDeclarations) {
                const variable = context.factory.createVariableDeclaration(name, 
                /*exclamationToken*/
                void 0, 
                /*type*/
                void 0, pendingExpressions2 ? context.factory.inlineExpressions(append(pendingExpressions2, value)) : value);
                variable.original = original;
                setTextRange(variable, location);
                declarations.push(variable);
            }
            return declarations;
            function emitExpression(value) {
                pendingExpressions = append(pendingExpressions, value);
            }
            function emitBindingOrAssignment(target, value, location, original) {
                Debug.assertNode(target, isBindingName);
                if (pendingExpressions) {
                    value = context.factory.inlineExpressions(append(pendingExpressions, value));
                    pendingExpressions = void 0;
                }
                pendingDeclarations.push({ pendingExpressions, name: target, value, location, original });
            }
        }