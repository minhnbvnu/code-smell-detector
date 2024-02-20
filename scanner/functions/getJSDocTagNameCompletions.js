function getJSDocTagNameCompletions() {
            return jsDocTagNameCompletionEntries || (jsDocTagNameCompletionEntries = map(jsDocTagNames, (tagName) => {
                return {
                    name: tagName,
                    kind: "keyword" /* keyword */,
                    kindModifiers: "",
                    sortText: ts_Completions_exports.SortText.LocationPriority
                };
            }));
        }