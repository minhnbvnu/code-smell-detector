function cannotBeGetter(node) {
                return node.type === "Identifier" &&
                    (isStrict || !isInsideWithBlock(node));
            }