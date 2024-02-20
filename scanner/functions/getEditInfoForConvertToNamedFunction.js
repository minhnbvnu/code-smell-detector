function getEditInfoForConvertToNamedFunction(context, func, variableInfo) {
            const { file } = context;
            const body = convertToBlock(func.body);
            const { variableDeclaration, variableDeclarationList, statement, name } = variableInfo;
            suppressLeadingTrivia(statement);
            const modifiersFlags = getCombinedModifierFlags(variableDeclaration) & 1 /* Export */ | getEffectiveModifierFlags(func);
            const modifiers = factory.createModifiersFromModifierFlags(modifiersFlags);
            const newNode = factory.createFunctionDeclaration(length(modifiers) ? modifiers : void 0, func.asteriskToken, name, func.typeParameters, func.parameters, func.type, body);
            if (variableDeclarationList.declarations.length === 1) {
                return ts_textChanges_exports.ChangeTracker.with(context, (t) => t.replaceNode(file, statement, newNode));
            }
            else {
                return ts_textChanges_exports.ChangeTracker.with(context, (t) => {
                    t.delete(file, variableDeclaration);
                    t.insertNodeAfter(file, statement, newNode);
                });
            }
        }