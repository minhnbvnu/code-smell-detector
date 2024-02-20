function addReturnStatement(changes, sourceFile, expression, statement) {
            suppressLeadingAndTrailingTrivia(expression);
            const probablyNeedSemi = probablyUsesSemicolons(sourceFile);
            changes.replaceNode(sourceFile, statement, factory.createReturnStatement(expression), {
                leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.Exclude,
                trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.Exclude,
                suffix: probablyNeedSemi ? ";" : void 0
            });
        }