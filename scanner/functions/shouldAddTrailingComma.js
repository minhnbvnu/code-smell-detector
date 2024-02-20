function shouldAddTrailingComma() {
                    if (!inArrowFunction || !inJsx) {
                        return false;
                    }
                    // Only <T>() => {} would need trailing comma
                    return (node.parent.params.length ===
                        1 &&
                        source.getTokensAfter(node)[0].value !== ',' &&
                        !node.default);
                }