function xz_to_xyz(v, new_z) {
    return {x:v.x, y: v.z, z: new_z || 0};
}