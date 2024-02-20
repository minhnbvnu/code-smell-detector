function addEnumMemberValueHints(text, position) {
                result.push({
                    text: `= ${truncation(text, maxHintsLength)}`,
                    position,
                    kind: "Enum" /* Enum */,
                    whitespaceBefore: true
                });
            }