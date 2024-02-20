function beginLabeledBlock(labelText) {
                const breakLabel = defineLabel();
                beginBlock({
                    kind: 4 /* Labeled */,
                    isScript: false,
                    labelText,
                    breakLabel
                });
            }