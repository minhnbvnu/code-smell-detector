function beginScriptLabeledBlock(labelText) {
                beginBlock({
                    kind: 4 /* Labeled */,
                    isScript: true,
                    labelText,
                    breakLabel: -1
                });
            }