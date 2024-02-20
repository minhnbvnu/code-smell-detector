function emitModuleBlock(node) {
                pushNameGenerationScope(node);
                forEach(node.statements, generateNames);
                emitBlockStatements(node, 
                /*forceSingleLine*/
                isEmptyBlock(node));
                popNameGenerationScope(node);
            }