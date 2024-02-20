function doChange21(changes, sourceFile, name) {
            changes.replaceNodeWithText(sourceFile, name, `${name.text}()`);
        }