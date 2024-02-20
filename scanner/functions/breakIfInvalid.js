function breakIfInvalid({ previousLeftText, rightNode, }) {
                let shouldBreak = false;
                const rightText = getText(rightNode);
                // can't just use startsWith because of cases like foo && fooBar.baz;
                const matchRegex = new RegExp(`^${
                // escape regex characters
                previousLeftText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^a-zA-Z0-9_$]`);
                if (!matchRegex.test(rightText) &&
                    // handle redundant cases like foo.bar && foo.bar
                    previousLeftText !== rightText) {
                    shouldBreak = true;
                }
                return { shouldBreak, leftText: previousLeftText, rightText };
            }