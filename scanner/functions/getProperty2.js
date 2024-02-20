function getProperty2(sourceFile, pos) {
            return cast(getTokenAtPosition(sourceFile, pos).parent, isShorthandPropertyAssignment);
        }