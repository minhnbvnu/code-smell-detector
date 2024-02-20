function getTypeAnnotationPosition(decl) {
                const closeParenToken = findChildOfKind(decl, 21 /* CloseParenToken */, file);
                if (closeParenToken) {
                    return closeParenToken.end;
                }
                return decl.parameters.end;
            }