function getKeyWidth(property) {
                const startToken = sourceCode.getFirstToken(property);
                const endToken = getLastTokenBeforeColon(property.key);
                return splitter.countGraphemes(sourceCode.getText().slice(startToken.range[0], endToken.range[1]));
            }