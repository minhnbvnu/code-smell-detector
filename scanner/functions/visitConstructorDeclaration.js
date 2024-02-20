function visitConstructorDeclaration(node) {
                const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
                enclosingFunctionFlags = getFunctionFlags(node);
                parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
                const updated = factory2.updateConstructorDeclaration(node, node.modifiers, visitParameterList(node.parameters, parameterVisitor, context), transformFunctionBody2(node));
                enclosingFunctionFlags = savedEnclosingFunctionFlags;
                parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
                return updated;
            }