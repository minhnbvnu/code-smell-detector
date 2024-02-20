function removeElem(element) {
                var i, key, nextElem, parent;
                if (element.ref.remove()) {
                    // When the reference is an element of an array.
                    key = element.ref.key;
                    parent = element.ref.parent;
                    // If removed from array, then decrease following items' keys.
                    i = worklist.length;
                    while (i--) {
                        nextElem = worklist[i];
                        if (nextElem.ref && nextElem.ref.parent === parent) {
                            if (nextElem.ref.key < key) {
                                break;
                            }
                            --nextElem.ref.key;
                        }
                    }
                }
            }