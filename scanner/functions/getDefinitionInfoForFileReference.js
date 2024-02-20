function getDefinitionInfoForFileReference(name, targetFileName, unverified) {
            return {
                fileName: targetFileName,
                textSpan: createTextSpanFromBounds(0, 0),
                kind: "script" /* scriptElement */,
                name,
                containerName: void 0,
                containerKind: void 0,
                // TODO: GH#18217
                unverified
            };
        }