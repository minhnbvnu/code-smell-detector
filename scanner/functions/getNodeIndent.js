function getNodeIndent(node, byLastLine) {
                const token = byLastLine ? sourceCode.getLastToken(node) : sourceCode.getFirstToken(node);
                const srcCharsBeforeNode = sourceCode.getText(token, token.loc.start.column).split("");
                const indentChars = srcCharsBeforeNode.slice(0, srcCharsBeforeNode.findIndex(char => char !== " " && char !== "\t"));
                const spaces = indentChars.filter(char => char === " ").length;
                const tabs = indentChars.filter(char => char === "\t").length;
                return {
                    space: spaces,
                    tab: tabs,
                    goodChar: indentType === "space" ? spaces : tabs,
                    badChar: indentType === "space" ? tabs : spaces
                };
            }