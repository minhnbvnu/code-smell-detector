function computeLineLength(line, tabWidth) {
                let extraCharacterCount = 0;
                line.replace(/\t/gu, (match, offset) => {
                    const totalOffset = offset + extraCharacterCount, previousTabStopOffset = tabWidth ? totalOffset % tabWidth : 0, spaceCount = tabWidth - previousTabStopOffset;
                    extraCharacterCount += spaceCount - 1; // -1 for the replaced tab
                });
                return Array.from(line).length + extraCharacterCount;
            }