function getDeclarationWithTypeAnnotation(symbol, enclosingDeclaration) {
                    return symbol.declarations && find(symbol.declarations, (s) => !!getEffectiveTypeAnnotationNode(s) && (!enclosingDeclaration || !!findAncestor(s, (n) => n === enclosingDeclaration)));
                }