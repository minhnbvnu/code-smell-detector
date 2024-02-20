function findContinueTarget(labelText) {
                if (blockStack) {
                    if (labelText) {
                        for (let i = blockStack.length - 1; i >= 0; i--) {
                            const block = blockStack[i];
                            if (supportsUnlabeledContinue(block) && hasImmediateContainingLabeledBlock(labelText, i - 1)) {
                                return block.continueLabel;
                            }
                        }
                    }
                    else {
                        for (let i = blockStack.length - 1; i >= 0; i--) {
                            const block = blockStack[i];
                            if (supportsUnlabeledContinue(block)) {
                                return block.continueLabel;
                            }
                        }
                    }
                }
                return 0;
            }