function visitGetAccessorDeclaration(node) {
                const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
                enclosingFunctionFlags = getFunctionFlags(node);
                parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
                const updated = factory2.updateGetAccessorDeclaration(node, node.modifiers, visitNode(node.name, visitor, isPropertyName), visitParameterList(node.parameters, parameterVisitor, context), 
                /*type*/
                void 0, transformFunctionBody2(node));
                enclosingFunctionFlags = savedEnclosingFunctionFlags;
                parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
                return updated;
            }