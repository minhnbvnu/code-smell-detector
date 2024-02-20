function getStatementsToMove(context) {
            const rangeToMove = getRangeToMove(context);
            if (rangeToMove === void 0)
                return void 0;
            const all = [];
            const ranges = [];
            const { toMove, afterLast } = rangeToMove;
            getRangesWhere(toMove, isAllowedStatementToMove, (start, afterEndIndex) => {
                for (let i = start; i < afterEndIndex; i++)
                    all.push(toMove[i]);
                ranges.push({ first: toMove[start], afterLast });
            });
            return all.length === 0 ? void 0 : { all, ranges };
        }