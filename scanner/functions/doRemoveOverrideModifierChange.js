function doRemoveOverrideModifierChange(changeTracker, sourceFile, pos) {
            const classElement = findContainerClassElementLike(sourceFile, pos);
            if (isSourceFileJS(sourceFile)) {
                changeTracker.filterJSDocTags(sourceFile, classElement, not(isJSDocOverrideTag));
                return;
            }
            const overrideModifier = find(classElement.modifiers, isOverrideModifier);
            Debug.assertIsDefined(overrideModifier);
            changeTracker.deleteModifier(sourceFile, overrideModifier);
        }