function transformClassDeclarationWithoutClassDecorators(node, name) {
                const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                const heritageClauses = visitNodes2(node.heritageClauses, visitor, isHeritageClause);
                let members = visitNodes2(node.members, visitor, isClassElement);
                let decorationStatements = [];
                ({ members, decorationStatements } = transformDecoratorsOfClassElements(node, members));
                const updated = factory2.updateClassDeclaration(node, modifiers, name, 
                /*typeParameters*/
                void 0, heritageClauses, members);
                return addRange([updated], decorationStatements);
            }