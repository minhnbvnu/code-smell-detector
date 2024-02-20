function convertToSeparateLines(firstComment, commentLinesList) {
                return commentLinesList.map(line => `// ${line}`).join(`\n${getInitialOffset(firstComment)}`);
            }