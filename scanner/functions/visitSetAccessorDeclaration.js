function visitSetAccessorDeclaration(node) {
                const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
                enclosingFunctionFlags = getFunctionFlags(node);
                parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
                const updated = factory2.updateSetAccessorDeclaration(node, node.modifiers, visitNode(node.name, visitor, isPropertyName), visitParameterList(node.parameters, parameterVisitor, context), transformFunctionBody2(node));
                enclosingFunctionFlags = savedEnclosingFunctionFlags;
                parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
                return updated;
            }