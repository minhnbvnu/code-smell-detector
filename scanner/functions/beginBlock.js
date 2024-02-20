function beginBlock(block) {
                if (!blocks) {
                    blocks = [];
                    blockActions = [];
                    blockOffsets = [];
                    blockStack = [];
                }
                const index = blockActions.length;
                blockActions[index] = 0 /* Open */;
                blockOffsets[index] = operations ? operations.length : 0;
                blocks[index] = block;
                blockStack.push(block);
                return index;
            }