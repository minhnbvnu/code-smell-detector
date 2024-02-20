function getJSDocTagCompletionDetails(name) {
            return {
                name,
                kind: "" /* unknown */,
                // TODO: should have its own kind?
                kindModifiers: "",
                displayParts: [textPart(name)],
                documentation: emptyArray,
                tags: void 0,
                codeActions: void 0
            };
        }