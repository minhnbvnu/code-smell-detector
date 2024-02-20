function getParentItem (node) {

        while (node) { // loop until we reach top of document
            if (node.className && node.className.match(/\bitem\b/)) {
                //found one!
                return node;
            }
            node = node.parentNode;
        }

        return null;

    }