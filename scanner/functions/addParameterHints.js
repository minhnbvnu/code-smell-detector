function addParameterHints(text, position, isFirstVariadicArgument) {
                result.push({
                    text: `${isFirstVariadicArgument ? "..." : ""}${truncation(text, maxHintsLength)}:`,
                    position,
                    kind: "Parameter" /* Parameter */,
                    whitespaceAfter: true
                });
            }