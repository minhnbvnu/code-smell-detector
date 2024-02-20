function endWithBlock() {
                Debug.assert(peekBlockKind() === 1 /* With */);
                const block = endBlock();
                markLabel(block.endLabel);
            }