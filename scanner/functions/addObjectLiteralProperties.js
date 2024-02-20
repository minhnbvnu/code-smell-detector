function addObjectLiteralProperties(changes, context, info) {
            const importAdder = createImportAdder(context.sourceFile, context.program, context.preferences, context.host);
            const quotePreference = getQuotePreference(context.sourceFile, context.preferences);
            const target = getEmitScriptTarget(context.program.getCompilerOptions());
            const checker = context.program.getTypeChecker();
            const props = map(info.properties, (prop) => {
                const initializer = tryGetValueFromType(context, checker, importAdder, quotePreference, checker.getTypeOfSymbol(prop), info.parentDeclaration);
                return factory.createPropertyAssignment(createPropertyNameFromSymbol(prop, target, quotePreference, checker), initializer);
            });
            const options = {
                leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.Exclude,
                trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.Exclude,
                indentation: info.indentation
            };
            changes.replaceNode(context.sourceFile, info.parentDeclaration, factory.createObjectLiteralExpression([...info.parentDeclaration.properties, ...props], 
            /*multiLine*/
            true), options);
            importAdder.writeFixes(changes);
        }