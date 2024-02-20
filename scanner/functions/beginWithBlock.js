function beginWithBlock(expression) {
                const startLabel = defineLabel();
                const endLabel = defineLabel();
                markLabel(startLabel);
                beginBlock({
                    kind: 1 /* With */,
                    expression,
                    startLabel,
                    endLabel
                });
            }