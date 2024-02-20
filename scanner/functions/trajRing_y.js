function trajRing_y(u){ 
    var dyPhysFromCenter=rRing*Math.sin(u/rRing+stitchAngleOffset);
    return center_yPhys+dyPhysFromCenter;
}