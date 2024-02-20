function fuzzy_eval(compressor, node, nullish) {
        if (node.truthy) return true;
        if (node.falsy && !nullish) return false;
        if (node.is_truthy()) return true;
        return node.evaluate(compressor, true);
    }