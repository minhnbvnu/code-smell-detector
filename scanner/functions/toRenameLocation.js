function toRenameLocation(entry, originalNode, checker, providePrefixAndSuffixText) {
            return { ...entryToDocumentSpan(entry), ...providePrefixAndSuffixText && getPrefixAndSuffixText(entry, originalNode, checker) };
        }