function endSwitchBlock() {
                Debug.assert(peekBlockKind() === 2 /* Switch */);
                const block = endBlock();
                const breakLabel = block.breakLabel;
                if (!block.isScript) {
                    markLabel(breakLabel);
                }
            }