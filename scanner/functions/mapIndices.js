function mapIndices (source, indices) {
        var out = [], i;

        for (i = 0; i < indices.length; i++) {
            out[i] = source[indices[i]];
        }

        return out;
    }