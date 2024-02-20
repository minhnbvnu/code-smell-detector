function isAssignmentOperatorOrHigher(kind) {
            return kind === 60 /* QuestionQuestionToken */ || isLogicalOperatorOrHigher(kind) || isAssignmentOperator(kind);
        }