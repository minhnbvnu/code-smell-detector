function set_camera(pos, angle, zoom, z) {
    if (is_object(pos) && (pos.x === undefined)) {
        zoom = pos.zoom;
        angle = pos.angle;
        z = pos.z;
        pos = pos.pos;
    }

    if (pos === undefined) { pos = {x:0, y:0}; }
    if (zoom === undefined) { zoom = 1; }

    if (typeof zoom !== 'number' && typeof zoom !== 'function') {
        $error('zoom argument to set_camera() must be a number or function');
    }
    if (typeof zoom === 'number' && (zoom <= 0 || !(zoom < Infinity))) {
        $error('zoom argument to set_camera() must be positive and finite');
    }
    $camera.x = pos.x;
    $camera.y = pos.y;

    if (pos.z !== undefined && z !== undefined && pos.z !== z) {
        $error('Cannot have different z and pos.z values on a camera');
    }
    
    if (z === undefined) { z = pos.z; }
    if (z === undefined) { z = 0; }
    $camera.has_pos_z = (pos.z !== undefined);

    $camera.z = z;
    $camera.angle = angle || 0;
    $camera.zoom = zoom;
}