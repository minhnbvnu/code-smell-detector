function getRelativePathFromDirectory(fromDirectory, to, getCanonicalFileNameOrIgnoreCase) {
            Debug.assert(getRootLength(fromDirectory) > 0 === getRootLength(to) > 0, "Paths must either both be absolute or both be relative");
            const getCanonicalFileName = typeof getCanonicalFileNameOrIgnoreCase === "function" ? getCanonicalFileNameOrIgnoreCase : identity;
            const ignoreCase = typeof getCanonicalFileNameOrIgnoreCase === "boolean" ? getCanonicalFileNameOrIgnoreCase : false;
            const pathComponents2 = getPathComponentsRelativeTo(fromDirectory, to, ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive, getCanonicalFileName);
            return getPathFromPathComponents(pathComponents2);
        }