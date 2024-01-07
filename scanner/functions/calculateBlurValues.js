function calculateBlurValues(sampleWeights, sampleOffsets, dx, dy, blurAmount) {
    // Look up how many samples our gaussian blur effect supports.

    // Create temporary arrays for computing our filter settings.
    // The first sample always has a zero offset.
    sampleWeights[0] = computeGaussian(0, blurAmount);
    sampleOffsets[0] = 0;
    sampleOffsets[1] = 0;

    // Maintain a sum of all the weighting values.
    var totalWeights = sampleWeights[0];

    // Add pairs of additional sample taps, positioned
    // along a line in both directions from the center.
    var i, len;
    for (i = 0, len = Math.floor(SAMPLE_COUNT / 2); i < len; i++) {
        // Store weights for the positive and negative taps.
        var weight = computeGaussian(i + 1, blurAmount);
        sampleWeights[i * 2] = weight;
        sampleWeights[i * 2 + 1] = weight;
        totalWeights += weight * 2;

        // To get the maximum amount of blurring from a limited number of
        // pixel shader samples, we take advantage of the bilinear filtering
        // hardware inside the texture fetch unit. If we position our texture
        // coordinates exactly halfway between two texels, the filtering unit
        // will average them for us, giving two samples for the price of one.
        // This allows us to step in units of two texels per sample, rather
        // than just one at a time. The 1.5 offset kicks things off by
        // positioning us nicely in between two texels.
        var sampleOffset = i * 2 + 1.5;

        // Store texture coordinate offsets for the positive and negative taps.
        sampleOffsets[i * 4] = dx * sampleOffset;
        sampleOffsets[i * 4 + 1] = dy * sampleOffset;
        sampleOffsets[i * 4 + 2] = -dx * sampleOffset;
        sampleOffsets[i * 4 + 3] = -dy * sampleOffset;
    }

    // Normalize the list of sample weightings, so they will always sum to one.
    for (i = 0, len = sampleWeights.length; i < len; i++) {
        sampleWeights[i] /= totalWeights;
    }
}