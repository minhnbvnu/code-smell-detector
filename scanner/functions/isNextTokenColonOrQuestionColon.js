function isNextTokenColonOrQuestionColon() {
                        return nextToken() === 58 /* ColonToken */ || token() === 57 /* QuestionToken */ && nextToken() === 58 /* ColonToken */;
                    }