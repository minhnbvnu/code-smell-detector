function getRenameInfoSuccess(displayName, fullDisplayName, kind, kindModifiers, node, sourceFile) {
            return {
                canRename: true,
                fileToRename: void 0,
                kind,
                displayName,
                fullDisplayName,
                kindModifiers,
                triggerSpan: createTriggerSpanForNode(node, sourceFile)
            };
        }