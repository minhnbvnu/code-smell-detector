function hasRecordedExternalHelpers(sourceFile) {
            const parseNode = getOriginalNode(sourceFile, isSourceFile);
            const emitNode = parseNode && parseNode.emitNode;
            return !!emitNode && (!!emitNode.externalHelpersModuleName || !!emitNode.externalHelpers);
        }