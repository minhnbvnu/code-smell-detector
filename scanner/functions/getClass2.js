function getClass2(sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            return cast(token.parent, isClassLike);
        }