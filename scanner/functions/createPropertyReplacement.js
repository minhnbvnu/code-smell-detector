function createPropertyReplacement(property, replacement) {
                return (fixer) => fixer.replaceTextRange(getTokenRange(property), replacement);
            }