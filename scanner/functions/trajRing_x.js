function trajRing_x(u){ 
    var dxPhysFromCenter=rRing*Math.cos(u/rRing+stitchAngleOffset);
    return center_xPhys+dxPhysFromCenter;
}