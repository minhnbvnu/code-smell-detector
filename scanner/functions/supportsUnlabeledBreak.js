function supportsUnlabeledBreak(block) {
                return block.kind === 2 /* Switch */ || block.kind === 3 /* Loop */;
            }