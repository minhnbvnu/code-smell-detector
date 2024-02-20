function emitConstructor(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                writeKeyword("constructor");
                emitSignatureAndBody(node, emitSignatureHead);
            }