function isUnparsedNode(node) {
            return isUnparsedTextLike(node) || node.kind === 303 /* UnparsedPrologue */ || node.kind === 307 /* UnparsedSyntheticReference */;
        }