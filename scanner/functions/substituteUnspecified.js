function substituteUnspecified(node) {
                switch (node.kind) {
                    case 300 /* ShorthandPropertyAssignment */:
                        return substituteShorthandPropertyAssignment(node);
                }
                return node;
            }