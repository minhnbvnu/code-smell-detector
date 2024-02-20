function $popGraphicsState() {
    const s = $graphicsStateStack.pop();
    $offsetX = s.ax; $offsetY = s.ay; $offsetZ = s.az;
    $scaleX = s.sx; $scaleY = s.sy; $scaleZ = s.sz;
    $skewXZ = s.kx; $skewYZ = s.ky;

    $clipX1 = s.cx1; $clipY1 = s.cy1; $clipZ1 = s.cz1;
    $clipX2 = s.cx2; $clipY2 = s.cy2; $clipZ2 = s.cz2;

    $camera.x = s.camera_x;
    $camera.y = s.camera_y;
    $camera.z = s.camera_z;
    $camera.angle = s.camera_angle;
    $camera.zoom = s.camera_zoom;

}