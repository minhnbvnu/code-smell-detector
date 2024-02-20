function emitInterfaceDeclaration(node) {
                pushPrivateNameGenerationScope(0 /* Auto */, 
                /*newReservedMemberNames*/
                void 0);
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                writeKeyword("interface");
                writeSpace();
                emit(node.name);
                emitTypeParameters(node, node.typeParameters);
                emitList(node, node.heritageClauses, 512 /* HeritageClauses */);
                writeSpace();
                writePunctuation("{");
                emitList(node, node.members, 129 /* InterfaceMembers */);
                writePunctuation("}");
                popPrivateNameGenerationScope();
            }