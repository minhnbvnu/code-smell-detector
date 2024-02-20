function createErrorMessageData(expectedAmount, actualSpaces, actualTabs) {
                const expectedStatement = `${expectedAmount} ${indentType}${expectedAmount === 1 ? "" : "s"}`; // e.g. "2 tabs"
                const foundSpacesWord = `space${actualSpaces === 1 ? "" : "s"}`; // e.g. "space"
                const foundTabsWord = `tab${actualTabs === 1 ? "" : "s"}`; // e.g. "tabs"
                let foundStatement;
                if (actualSpaces > 0 && actualTabs > 0) {
                    foundStatement = `${actualSpaces} ${foundSpacesWord} and ${actualTabs} ${foundTabsWord}`; // e.g. "1 space and 2 tabs"
                }
                else if (actualSpaces > 0) {
                    /*
                     * Abbreviate the message if the expected indentation is also spaces.
                     * e.g. 'Expected 4 spaces but found 2' rather than 'Expected 4 spaces but found 2 spaces'
                     */
                    foundStatement = indentType === "space" ? actualSpaces : `${actualSpaces} ${foundSpacesWord}`;
                }
                else if (actualTabs > 0) {
                    foundStatement = indentType === "tab" ? actualTabs : `${actualTabs} ${foundTabsWord}`;
                }
                else {
                    foundStatement = "0";
                }
                return {
                    expected: expectedStatement,
                    actual: foundStatement
                };
            }