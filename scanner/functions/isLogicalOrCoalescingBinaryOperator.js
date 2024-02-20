function isLogicalOrCoalescingBinaryOperator(token) {
            return isBinaryLogicalOperator(token) || token === 60 /* QuestionQuestionToken */;
        }