function visitClassDeclaration(node) {
                let statements;
                const name = factory2.getLocalName(node);
                hoistVariableDeclaration(name);
                statements = append(statements, setTextRange(factory2.createExpressionStatement(factory2.createAssignment(name, setTextRange(factory2.createClassExpression(visitNodes2(node.modifiers, modifierVisitor, isModifierLike), node.name, 
                /*typeParameters*/
                void 0, visitNodes2(node.heritageClauses, visitor, isHeritageClause), visitNodes2(node.members, visitor, isClassElement)), node))), node));
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfHoistedDeclaration(deferredExports[id], node);
                }
                else {
                    statements = appendExportsOfHoistedDeclaration(statements, node);
                }
                return singleOrMany(statements);
            }