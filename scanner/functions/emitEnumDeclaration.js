function emitEnumDeclaration(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                writeKeyword("enum");
                writeSpace();
                emit(node.name);
                writeSpace();
                writePunctuation("{");
                emitList(node, node.members, 145 /* EnumMembers */);
                writePunctuation("}");
            }