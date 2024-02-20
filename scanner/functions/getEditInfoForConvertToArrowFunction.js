function getEditInfoForConvertToArrowFunction(context, func) {
            const { file } = context;
            const statements = func.body.statements;
            const head = statements[0];
            let body;
            if (canBeConvertedToExpression(func.body, head)) {
                body = head.expression;
                suppressLeadingAndTrailingTrivia(body);
                copyComments(head, body);
            }
            else {
                body = func.body;
            }
            const newNode = factory.createArrowFunction(func.modifiers, func.typeParameters, func.parameters, func.type, factory.createToken(38 /* EqualsGreaterThanToken */), body);
            return ts_textChanges_exports.ChangeTracker.with(context, (t) => t.replaceNode(file, func, newNode));
        }