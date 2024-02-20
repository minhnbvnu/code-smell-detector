function doAddOverrideModifierChange(changeTracker, sourceFile, pos) {
            const classElement = findContainerClassElementLike(sourceFile, pos);
            if (isSourceFileJS(sourceFile)) {
                changeTracker.addJSDocTags(sourceFile, classElement, [factory.createJSDocOverrideTag(factory.createIdentifier("override"))]);
                return;
            }
            const modifiers = classElement.modifiers || emptyArray;
            const staticModifier = find(modifiers, isStaticModifier);
            const abstractModifier = find(modifiers, isAbstractModifier);
            const accessibilityModifier = find(modifiers, (m) => isAccessibilityModifier(m.kind));
            const lastDecorator = findLast(modifiers, isDecorator);
            const modifierPos = abstractModifier ? abstractModifier.end : staticModifier ? staticModifier.end : accessibilityModifier ? accessibilityModifier.end : lastDecorator ? skipTrivia(sourceFile.text, lastDecorator.end) : classElement.getStart(sourceFile);
            const options = accessibilityModifier || staticModifier || abstractModifier ? { prefix: " " } : { suffix: " " };
            changeTracker.insertModifierAt(sourceFile, modifierPos, 161 /* OverrideKeyword */, options);
        }