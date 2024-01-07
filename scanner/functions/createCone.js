function createCone(device, opts = {}) {
    // Check the supplied options and provide defaults for unspecified ones
    const baseRadius = opts.baseRadius ?? 0.5;
    const peakRadius = opts.peakRadius ?? 0;
    const height = opts.height ?? 1;
    const heightSegments = opts.heightSegments ?? 5;
    const capSegments = opts.capSegments ?? 18;
    const calcTangents = opts.calculateTangents ?? false;

    const options = _createConeData(baseRadius, peakRadius, height, heightSegments, capSegments, false);

    if (calcTangents) {
        options.tangents = calculateTangents(options.positions, options.normals, options.uvs, options.indices);
    }

    return createMesh(device, options.positions, options);
}