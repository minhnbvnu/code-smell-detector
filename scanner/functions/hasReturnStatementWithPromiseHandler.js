function hasReturnStatementWithPromiseHandler(body, checker) {
            return !!forEachReturnStatement(body, (statement) => isReturnStatementWithFixablePromiseHandler(statement, checker));
        }