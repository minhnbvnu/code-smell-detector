function formatReportedCommentValue(token) {
                const valueLines = token.value.split("\n");
                const value = valueLines[0];
                const formattedValue = `${value.slice(0, 12)}...`;
                return valueLines.length === 1 && value.length <= 12 ? value : formattedValue;
            }