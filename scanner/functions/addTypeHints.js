function addTypeHints(text, position) {
                result.push({
                    text: `: ${truncation(text, maxHintsLength)}`,
                    position,
                    kind: "Type" /* Type */,
                    whitespaceBefore: true
                });
            }