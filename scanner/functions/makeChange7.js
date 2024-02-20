function makeChange7(changeTracker, sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            const param = token.parent;
            if (!isParameter(param)) {
                return Debug.fail("Tried to add a parameter name to a non-parameter: " + Debug.formatSyntaxKind(token.kind));
            }
            const i = param.parent.parameters.indexOf(param);
            Debug.assert(!param.type, "Tried to add a parameter name to a parameter that already had one.");
            Debug.assert(i > -1, "Parameter not found in parent parameter list.");
            const typeNode = factory.createTypeReferenceNode(param.name, 
            /*typeArguments*/
            void 0);
            const replacement = factory.createParameterDeclaration(param.modifiers, param.dotDotDotToken, "arg" + i, param.questionToken, param.dotDotDotToken ? factory.createArrayTypeNode(typeNode) : typeNode, param.initializer);
            changeTracker.replaceNode(sourceFile, param, replacement);
        }