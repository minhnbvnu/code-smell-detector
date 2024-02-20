function generateAccessorFromProperty(file, program, start, end, context, _actionName) {
            const fieldInfo = getAccessorConvertiblePropertyAtPosition(file, program, start, end);
            if (!fieldInfo || ts_refactor_exports.isRefactorErrorInfo(fieldInfo))
                return void 0;
            const changeTracker = ts_textChanges_exports.ChangeTracker.fromContext(context);
            const { isStatic: isStatic2, isReadonly, fieldName, accessorName, originalName, type, container, declaration } = fieldInfo;
            suppressLeadingAndTrailingTrivia(fieldName);
            suppressLeadingAndTrailingTrivia(accessorName);
            suppressLeadingAndTrailingTrivia(declaration);
            suppressLeadingAndTrailingTrivia(container);
            let accessorModifiers;
            let fieldModifiers;
            if (isClassLike(container)) {
                const modifierFlags = getEffectiveModifierFlags(declaration);
                if (isSourceFileJS(file)) {
                    const modifiers = factory.createModifiersFromModifierFlags(modifierFlags);
                    accessorModifiers = modifiers;
                    fieldModifiers = modifiers;
                }
                else {
                    accessorModifiers = factory.createModifiersFromModifierFlags(prepareModifierFlagsForAccessor(modifierFlags));
                    fieldModifiers = factory.createModifiersFromModifierFlags(prepareModifierFlagsForField(modifierFlags));
                }
                if (canHaveDecorators(declaration)) {
                    fieldModifiers = concatenate(getDecorators(declaration), fieldModifiers);
                }
            }
            updateFieldDeclaration(changeTracker, file, declaration, type, fieldName, fieldModifiers);
            const getAccessor = generateGetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic2, container);
            suppressLeadingAndTrailingTrivia(getAccessor);
            insertAccessor(changeTracker, file, getAccessor, declaration, container);
            if (isReadonly) {
                const constructor = getFirstConstructorWithBody(container);
                if (constructor) {
                    updateReadonlyPropertyInitializerStatementConstructor(changeTracker, file, constructor, fieldName.text, originalName);
                }
            }
            else {
                const setAccessor = generateSetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic2, container);
                suppressLeadingAndTrailingTrivia(setAccessor);
                insertAccessor(changeTracker, file, setAccessor, declaration, container);
            }
            return changeTracker.getChanges();
        }