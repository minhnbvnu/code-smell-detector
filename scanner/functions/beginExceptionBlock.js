function beginExceptionBlock() {
                const startLabel = defineLabel();
                const endLabel = defineLabel();
                markLabel(startLabel);
                beginBlock({
                    kind: 0 /* Exception */,
                    state: 0 /* Try */,
                    startLabel,
                    endLabel
                });
                emitNop();
                return endLabel;
            }