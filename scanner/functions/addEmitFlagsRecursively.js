function addEmitFlagsRecursively(node, flag, getChild) {
            addEmitFlags(node, flag);
            const child = getChild(node);
            if (child)
                addEmitFlagsRecursively(child, flag, getChild);
        }