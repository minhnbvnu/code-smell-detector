function emitClassStaticBlockDeclaration(node) {
                writeKeyword("static");
                emitBlockFunctionBody(node.body);
            }