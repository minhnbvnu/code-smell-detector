function getJSCompletionEntries(sourceFile, position, uniqueNames, target, entries) {
            getNameTable(sourceFile).forEach((pos, name) => {
                if (pos === position) {
                    return;
                }
                const realName = unescapeLeadingUnderscores(name);
                if (!uniqueNames.has(realName) && isIdentifierText(realName, target)) {
                    uniqueNames.add(realName);
                    insertSorted(entries, {
                        name: realName,
                        kind: "warning" /* warning */,
                        kindModifiers: "",
                        sortText: SortText.JavascriptIdentifiers,
                        isFromUncheckedFile: true
                    }, compareCompletionEntries);
                }
            });
        }