function shouldEmitSourceMaps(node) {
                return !sourceMapsDisabled && !isSourceFile(node) && !isInJsonFile(node) && !isUnparsedSource(node) && !isUnparsedPrepend(node);
            }