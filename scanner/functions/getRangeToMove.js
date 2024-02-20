function getRangeToMove(context) {
            const { file } = context;
            const range = createTextRangeFromSpan(getRefactorContextSpan(context));
            const { statements } = file;
            const startNodeIndex = findIndex(statements, (s) => s.end > range.pos);
            if (startNodeIndex === -1)
                return void 0;
            const startStatement = statements[startNodeIndex];
            if (isNamedDeclaration(startStatement) && startStatement.name && rangeContainsRange(startStatement.name, range)) {
                return { toMove: [statements[startNodeIndex]], afterLast: statements[startNodeIndex + 1] };
            }
            if (range.pos > startStatement.getStart(file))
                return void 0;
            const afterEndNodeIndex = findIndex(statements, (s) => s.end > range.end, startNodeIndex);
            if (afterEndNodeIndex !== -1 && (afterEndNodeIndex === 0 || statements[afterEndNodeIndex].getStart(file) < range.end))
                return void 0;
            return {
                toMove: statements.slice(startNodeIndex, afterEndNodeIndex === -1 ? statements.length : afterEndNodeIndex),
                afterLast: afterEndNodeIndex === -1 ? void 0 : statements[afterEndNodeIndex]
            };
        }