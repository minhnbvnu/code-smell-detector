function setContinueTarget(node, target) {
                let label = activeLabelList;
                while (label && node.parent.kind === 253 /* LabeledStatement */) {
                    label.continueTarget = target;
                    label = label.next;
                    node = node.parent;
                }
                return target;
            }