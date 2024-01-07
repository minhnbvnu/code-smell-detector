function createCapsule(device, opts = {}) {
    // Check the supplied options and provide defaults for unspecified ones
    const radius = opts.radius ?? 0.3;
    const height = opts.height ?? 1;
    const heightSegments = opts.heightSegments ?? 1;
    const sides = opts.sides ?? 20;
    const calcTangents = opts.calculateTangents ?? false;

    // Create vertex data for a cone that has a base and peak radius that is the same (i.e. a cylinder)
    const options = _createConeData(radius, radius, height - 2 * radius, heightSegments, sides, true);

    if (calcTangents) {
        options.tangents = calculateTangents(options.positions, options.normals, options.uvs, options.indices);
    }

    return createMesh(device, options.positions, options);
}