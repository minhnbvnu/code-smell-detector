function getReturnStatementsWithPromiseHandlers(body, checker) {
            const res = [];
            forEachReturnStatement(body, (ret) => {
                if (isReturnStatementWithFixablePromiseHandler(ret, checker))
                    res.push(ret);
            });
            return res;
        }