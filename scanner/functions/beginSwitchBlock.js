function beginSwitchBlock() {
                const breakLabel = defineLabel();
                beginBlock({
                    kind: 2 /* Switch */,
                    isScript: false,
                    breakLabel
                });
                return breakLabel;
            }