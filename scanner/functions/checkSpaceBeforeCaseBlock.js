function checkSpaceBeforeCaseBlock(node) {
                const cases = node.cases;
                let openingBrace;
                if (cases.length > 0) {
                    openingBrace = sourceCode.getTokenBefore(cases[0]);
                }
                else {
                    openingBrace = sourceCode.getLastToken(node, 1);
                }
                checkPrecedingSpace(openingBrace);
            }