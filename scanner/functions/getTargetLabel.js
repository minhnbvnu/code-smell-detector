function getTargetLabel(referenceNode, labelName) {
            while (referenceNode) {
                if (referenceNode.kind === 253 /* LabeledStatement */ && referenceNode.label.escapedText === labelName) {
                    return referenceNode.label;
                }
                referenceNode = referenceNode.parent;
            }
            return void 0;
        }