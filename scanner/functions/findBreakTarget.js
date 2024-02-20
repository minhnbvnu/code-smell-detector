function findBreakTarget(labelText) {
                if (blockStack) {
                    if (labelText) {
                        for (let i = blockStack.length - 1; i >= 0; i--) {
                            const block = blockStack[i];
                            if (supportsLabeledBreakOrContinue(block) && block.labelText === labelText) {
                                return block.breakLabel;
                            }
                            else if (supportsUnlabeledBreak(block) && hasImmediateContainingLabeledBlock(labelText, i - 1)) {
                                return block.breakLabel;
                            }
                        }
                    }
                    else {
                        for (let i = blockStack.length - 1; i >= 0; i--) {
                            const block = blockStack[i];
                            if (supportsUnlabeledBreak(block)) {
                                return block.breakLabel;
                            }
                        }
                    }
                }
                return 0;
            }