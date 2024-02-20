function getStaticValue(node, initialScope = null) {
        try {
            return getStaticValueR(node, initialScope);
        }
        catch (_error) {
            return null;
        }
    }