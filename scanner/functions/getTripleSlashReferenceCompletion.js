function getTripleSlashReferenceCompletion(sourceFile, position, compilerOptions, host) {
            const token = getTokenAtPosition(sourceFile, position);
            const commentRanges = getLeadingCommentRanges(sourceFile.text, token.pos);
            const range = commentRanges && find(commentRanges, (commentRange) => position >= commentRange.pos && position <= commentRange.end);
            if (!range) {
                return void 0;
            }
            const text = sourceFile.text.slice(range.pos, position);
            const match = tripleSlashDirectiveFragmentRegex.exec(text);
            if (!match) {
                return void 0;
            }
            const [, prefix, kind, toComplete] = match;
            const scriptPath = getDirectoryPath(sourceFile.path);
            const names = kind === "path" ? getCompletionEntriesForDirectoryFragment(toComplete, scriptPath, getExtensionOptions(compilerOptions, 0 /* Filename */, sourceFile), host, 
            /*moduleSpecifierIsRelative*/
            true, sourceFile.path) : kind === "types" ? getCompletionEntriesFromTypings(host, compilerOptions, scriptPath, getFragmentDirectory(toComplete), getExtensionOptions(compilerOptions, 1 /* ModuleSpecifier */, sourceFile)) : Debug.fail();
            return addReplacementSpans(toComplete, range.pos + prefix.length, arrayFrom(names.values()));
        }