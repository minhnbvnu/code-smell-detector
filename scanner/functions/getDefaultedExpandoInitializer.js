function getDefaultedExpandoInitializer(name, initializer, isPrototypeAssignment) {
            const e = isBinaryExpression(initializer) && (initializer.operatorToken.kind === 56 /* BarBarToken */ || initializer.operatorToken.kind === 60 /* QuestionQuestionToken */) && getExpandoInitializer(initializer.right, isPrototypeAssignment);
            if (e && isSameEntityName(name, initializer.left)) {
                return e;
            }
        }