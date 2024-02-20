function emitClassDeclarationOrExpression(node) {
                pushPrivateNameGenerationScope(0 /* Auto */, 
                /*newReservedMemberNames*/
                void 0);
                forEach(node.members, generateMemberNames);
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                true);
                emitTokenWithComment(84 /* ClassKeyword */, moveRangePastModifiers(node).pos, writeKeyword, node);
                if (node.name) {
                    writeSpace();
                    emitIdentifierName(node.name);
                }
                const indentedFlag = getEmitFlags(node) & 131072 /* Indented */;
                if (indentedFlag) {
                    increaseIndent();
                }
                emitTypeParameters(node, node.typeParameters);
                emitList(node, node.heritageClauses, 0 /* ClassHeritageClauses */);
                writeSpace();
                writePunctuation("{");
                emitList(node, node.members, 129 /* ClassMembers */);
                writePunctuation("}");
                if (indentedFlag) {
                    decreaseIndent();
                }
                popPrivateNameGenerationScope();
            }