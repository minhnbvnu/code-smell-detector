function checkUnaryWordOperatorForSpaces(node, firstToken, secondToken, word) {
                if (overrideExistsForOperator(word)) {
                    if (overrideEnforcesSpaces(word)) {
                        verifyWordHasSpaces(node, firstToken, secondToken, word);
                    }
                    else {
                        verifyWordDoesntHaveSpaces(node, firstToken, secondToken, word);
                    }
                }
                else if (options.words) {
                    verifyWordHasSpaces(node, firstToken, secondToken, word);
                }
                else {
                    verifyWordDoesntHaveSpaces(node, firstToken, secondToken, word);
                }
            }