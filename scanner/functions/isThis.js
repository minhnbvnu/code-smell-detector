function isThis(node) {
            switch (node.kind) {
                case 108 /* ThisKeyword */:
                    return true;
                case 79 /* Identifier */:
                    return identifierIsThisKeyword(node) && node.parent.kind === 166 /* Parameter */;
                default:
                    return false;
            }
        }