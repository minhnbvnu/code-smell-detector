function isNodeArray(array) {
            return hasProperty(array, "pos") && hasProperty(array, "end");
        }