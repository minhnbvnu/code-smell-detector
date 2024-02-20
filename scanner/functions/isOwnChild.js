function isOwnChild(n, parent2) {
            const par = isModuleBlock(n.parent) ? n.parent.parent : n.parent;
            return par === parent2.node || contains(parent2.additionalNodes, par);
        }