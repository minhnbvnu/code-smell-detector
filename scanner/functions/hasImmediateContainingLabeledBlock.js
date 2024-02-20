function hasImmediateContainingLabeledBlock(labelText, start) {
                for (let j = start; j >= 0; j--) {
                    const containingBlock = blockStack[j];
                    if (supportsLabeledBreakOrContinue(containingBlock)) {
                        if (containingBlock.labelText === labelText) {
                            return true;
                        }
                    }
                    else {
                        break;
                    }
                }
                return false;
            }