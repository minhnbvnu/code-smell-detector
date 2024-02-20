function emitBlock(node) {
                emitBlockStatements(node, 
                /*forceSingleLine*/
                !node.multiLine && isEmptyBlock(node));
            }