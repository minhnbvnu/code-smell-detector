function doChange19(changes, sourceFile, start) {
            const token = getTokenAtPosition(sourceFile, start);
            const labeledStatement = cast(token.parent, isLabeledStatement);
            const pos = token.getStart(sourceFile);
            const statementPos = labeledStatement.statement.getStart(sourceFile);
            const end = positionsAreOnSameLine(pos, statementPos, sourceFile) ? statementPos : skipTrivia(sourceFile.text, findChildOfKind(labeledStatement, 58 /* ColonToken */, sourceFile).end, 
            /*stopAfterLineBreak*/
            true);
            changes.deleteRange(sourceFile, { pos, end });
        }