function reScanQuestionToken() {
                Debug.assert(token === 60 /* QuestionQuestionToken */, "'reScanQuestionToken' should only be called on a '??'");
                pos = tokenPos + 1;
                return token = 57 /* QuestionToken */;
            }