function validateTokenIndent(token, desiredIndent) {
                const indentation = tokenInfo.getTokenIndent(token);
                return indentation === desiredIndent ||
                    // To avoid conflicts with no-mixed-spaces-and-tabs, don't report mixed spaces and tabs.
                    indentation.includes(" ") && indentation.includes("\t");
            }