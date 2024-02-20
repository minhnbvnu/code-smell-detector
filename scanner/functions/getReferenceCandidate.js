function getReferenceCandidate(node) {
                switch (node.kind) {
                    case 214 /* ParenthesizedExpression */:
                        return getReferenceCandidate(node.expression);
                    case 223 /* BinaryExpression */:
                        switch (node.operatorToken.kind) {
                            case 63 /* EqualsToken */:
                            case 75 /* BarBarEqualsToken */:
                            case 76 /* AmpersandAmpersandEqualsToken */:
                            case 77 /* QuestionQuestionEqualsToken */:
                                return getReferenceCandidate(node.left);
                            case 27 /* CommaToken */:
                                return getReferenceCandidate(node.right);
                        }
                }
                return node;
            }