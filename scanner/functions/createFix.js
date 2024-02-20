function createFix(range, text) {
                return function (fixer) {
                    return fixer.replaceTextRange(range, text);
                };
            }