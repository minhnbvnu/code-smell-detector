function isUnparsedTextLike(node) {
            switch (node.kind) {
                case 305 /* UnparsedText */:
                case 306 /* UnparsedInternalText */:
                    return true;
                default:
                    return false;
            }
        }