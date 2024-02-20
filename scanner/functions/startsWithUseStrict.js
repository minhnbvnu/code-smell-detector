function startsWithUseStrict(statements) {
            const firstStatement = firstOrUndefined(statements);
            return firstStatement !== void 0 && isPrologueDirective(firstStatement) && isUseStrictPrologue(firstStatement);
        }