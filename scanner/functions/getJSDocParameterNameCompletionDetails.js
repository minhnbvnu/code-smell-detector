function getJSDocParameterNameCompletionDetails(name) {
            return {
                name,
                kind: "parameter" /* parameterElement */,
                kindModifiers: "",
                displayParts: [textPart(name)],
                documentation: emptyArray,
                tags: void 0,
                codeActions: void 0
            };
        }