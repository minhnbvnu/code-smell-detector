function distanceToRect(min, max, xyz) {
    const dx = Math.max(min[0] - xyz[0], 0, xyz[0] - max[0]);
    const dy = Math.max(min[1] - xyz[1], 0, xyz[1] - max[1]);
    const dz = Math.max(min[2] - xyz[2], 0, xyz[2] - max[2]);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}