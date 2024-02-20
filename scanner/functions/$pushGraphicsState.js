function $pushGraphicsState() {
    $graphicsStateStack.push({
        cx1:$clipX1, cy1:$clipY1, cz1:$clipZ1,
        cx2:$clipX2, cy2:$clipY2, cz2:$clipZ2, 
        ax:$offsetX, ay:$offsetY, az:$offsetZ,
        sx:$scaleX,  sy:$scaleY,  sz:$scaleZ,
        kx:$skewXZ,  ky:$skewYZ,

        camera_x: $camera.x,
        camera_y: $camera.y,
        camera_z: $camera.z,
        camera_angle: $camera.angle,
        camera_zoom: $camera.zoom
    });
}