function isWrappedInParenthesis(node) {
                const regex = /^return\s*?\(\s*?\);*?/u;
                const statementWithoutArgument = sourceCode.getText(node).replace(sourceCode.getText(node.argument), "");
                return regex.test(statementWithoutArgument);
            }