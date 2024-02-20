function isLogicalOrCoalescingAssignmentOperator(token) {
            return token === 75 /* BarBarEqualsToken */ || token === 76 /* AmpersandAmpersandEqualsToken */ || token === 77 /* QuestionQuestionEqualsToken */;
        }