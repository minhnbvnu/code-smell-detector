function markLoneBlock() {
                if (loneBlocks.length === 0) {
                    return;
                }
                const block = context.getAncestors().pop();
                if (loneBlocks[loneBlocks.length - 1] === block) {
                    loneBlocks.pop();
                }
            }