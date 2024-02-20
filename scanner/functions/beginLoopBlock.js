function beginLoopBlock(continueLabel) {
                const breakLabel = defineLabel();
                beginBlock({
                    kind: 3 /* Loop */,
                    isScript: false,
                    breakLabel,
                    continueLabel
                });
                return breakLabel;
            }