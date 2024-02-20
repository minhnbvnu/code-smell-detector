function bin_counts(data, bin_edges) {
        const nbins = bin_edges.length - 1;
        const counts = Array(nbins).fill(0);
        for (let i = 0; i < data.length; i++) {
            const sample = data[i];
            const index = sorted_index(bin_edges, sample);
            const bin = (0, math_1.clamp)(index - 1, 0, nbins - 1);
            counts[bin] += 1;
        }
        return counts;
    }