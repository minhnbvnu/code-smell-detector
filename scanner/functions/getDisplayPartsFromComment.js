function getDisplayPartsFromComment(comment, checker) {
            if (typeof comment === "string") {
                return [textPart(comment)];
            }
            return flatMap(comment, (node) => node.kind === 324 /* JSDocText */ ? [textPart(node.text)] : buildLinkParts(node, checker));
        }