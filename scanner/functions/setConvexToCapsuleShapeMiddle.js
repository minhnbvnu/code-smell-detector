function setConvexToCapsuleShapeMiddle(convexShape, capsuleShape){
    vec2.set(convexShape.vertices[0], -capsuleShape.length * 0.5, -capsuleShape.radius);
    vec2.set(convexShape.vertices[1],  capsuleShape.length * 0.5, -capsuleShape.radius);
    vec2.set(convexShape.vertices[2],  capsuleShape.length * 0.5,  capsuleShape.radius);
    vec2.set(convexShape.vertices[3], -capsuleShape.length * 0.5,  capsuleShape.radius);
}