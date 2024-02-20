function convertToBlock(firstComment, commentLinesList) {
                return `/* ${commentLinesList.join(`\n${getInitialOffset(firstComment)}   `)} */`;
            }