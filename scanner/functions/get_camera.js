function get_camera() {
    return {
        pos: $camera.has_pos_z ? xyz($camera.x, $camera.y, $camera.z) : xy($camera.x, $camera.y),
        angle: $camera.angle,
        zoom: $camera.zoom,
        z: $camera.z
    };
}