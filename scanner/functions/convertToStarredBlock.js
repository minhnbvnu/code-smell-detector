function convertToStarredBlock(firstComment, commentLinesList) {
                const initialOffset = getInitialOffset(firstComment);
                return `/*\n${commentLinesList.map(line => `${initialOffset} * ${line}`).join("\n")}\n${initialOffset} */`;
            }