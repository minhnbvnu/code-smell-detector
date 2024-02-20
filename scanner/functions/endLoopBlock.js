function endLoopBlock() {
                Debug.assert(peekBlockKind() === 3 /* Loop */);
                const block = endBlock();
                const breakLabel = block.breakLabel;
                if (!block.isScript) {
                    markLabel(breakLabel);
                }
            }