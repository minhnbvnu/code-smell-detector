function visitFunctionDeclaration(node) {
                if (hasSyntacticModifier(node, 1 /* Export */)) {
                    hoistedStatements = append(hoistedStatements, factory2.updateFunctionDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifierLike), node.asteriskToken, factory2.getDeclarationName(node, 
                    /*allowComments*/
                    true, 
                    /*allowSourceMaps*/
                    true), 
                    /*typeParameters*/
                    void 0, visitNodes2(node.parameters, visitor, isParameter), 
                    /*type*/
                    void 0, visitNode(node.body, visitor, isBlock)));
                }
                else {
                    hoistedStatements = append(hoistedStatements, visitEachChild(node, visitor, context));
                }
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfHoistedDeclaration(deferredExports[id], node);
                }
                else {
                    hoistedStatements = appendExportsOfHoistedDeclaration(hoistedStatements, node);
                }
                return void 0;
            }