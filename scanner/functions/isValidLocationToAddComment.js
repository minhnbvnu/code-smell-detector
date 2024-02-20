function isValidLocationToAddComment(sourceFile, position) {
            return !isInComment(sourceFile, position) && !isInString(sourceFile, position) && !isInTemplateString(sourceFile, position) && !isInJSXText(sourceFile, position);
        }