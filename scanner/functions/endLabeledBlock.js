function endLabeledBlock() {
                Debug.assert(peekBlockKind() === 4 /* Labeled */);
                const block = endBlock();
                if (!block.isScript) {
                    markLabel(block.breakLabel);
                }
            }