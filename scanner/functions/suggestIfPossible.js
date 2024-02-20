function suggestIfPossible(groupStart, pattern, rawText, regexNode) {
        switch (regexNode.type) {
            case "Literal":
                if (typeof regexNode.value === "string" && rawText.includes("\\")) {
                    return null;
                }
                break;
            case "TemplateLiteral":
                if (regexNode.expressions.length || rawText.slice(1, -1) !== pattern) {
                    return null;
                }
                break;
            default:
                return null;
        }
        const start = regexNode.range[0] + groupStart + 2;
        return [
            {
                fix(fixer) {
                    const existingTemps = pattern.match(/temp\d+/gu) || [];
                    const highestTempCount = existingTemps.reduce((previous, next) => Math.max(previous, Number(next.slice("temp".length))), 0);
                    return fixer.insertTextBeforeRange([start, start], `?<temp${highestTempCount + 1}>`);
                },
                messageId: "addGroupName"
            },
            {
                fix(fixer) {
                    return fixer.insertTextBeforeRange([start, start], "?:");
                },
                messageId: "addNonCapture"
            }
        ];
    }