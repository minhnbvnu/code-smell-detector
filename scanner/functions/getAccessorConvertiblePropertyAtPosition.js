function getAccessorConvertiblePropertyAtPosition(file, program, start, end, considerEmptySpans = true) {
            const node = getTokenAtPosition(file, start);
            const cursorRequest = start === end && considerEmptySpans;
            const declaration = findAncestor(node.parent, isAcceptedDeclaration);
            const meaning = 28 /* AccessibilityModifier */ | 32 /* Static */ | 64 /* Readonly */;
            if (!declaration || !(nodeOverlapsWithStartEnd(declaration.name, file, start, end) || cursorRequest)) {
                return {
                    error: getLocaleSpecificMessage(Diagnostics.Could_not_find_property_for_which_to_generate_accessor)
                };
            }
            if (!isConvertibleName(declaration.name)) {
                return {
                    error: getLocaleSpecificMessage(Diagnostics.Name_is_not_valid)
                };
            }
            if ((getEffectiveModifierFlags(declaration) & 126975 /* Modifier */ | meaning) !== meaning) {
                return {
                    error: getLocaleSpecificMessage(Diagnostics.Can_only_convert_property_with_modifier)
                };
            }
            const name = declaration.name.text;
            const startWithUnderscore = startsWithUnderscore(name);
            const fieldName = createPropertyName(startWithUnderscore ? name : getUniqueName(`_${name}`, file), declaration.name);
            const accessorName = createPropertyName(startWithUnderscore ? getUniqueName(name.substring(1), file) : name, declaration.name);
            return {
                isStatic: hasStaticModifier(declaration),
                isReadonly: hasEffectiveReadonlyModifier(declaration),
                type: getDeclarationType(declaration, program),
                container: declaration.kind === 166 /* Parameter */ ? declaration.parent.parent : declaration.parent,
                originalName: declaration.name.text,
                declaration,
                fieldName,
                accessorName,
                renameAccessor: startWithUnderscore
            };
        }