function pointInConvex(worldPoint,convexShape,convexOffset,convexAngle){
    var worldVertex0 = pic_worldVertex0,
        worldVertex1 = pic_worldVertex1,
        r0 = pic_r0,
        r1 = pic_r1,
        point = worldPoint,
        verts = convexShape.vertices,
        lastCross = null;
    for(var i=0; i!==verts.length+1; i++){
        var v0 = verts[i%verts.length],
            v1 = verts[(i+1)%verts.length];

        // Transform vertices to world
        // @todo The point should be transformed to local coordinates in the convex, no need to transform each vertex
        vec2.rotate(worldVertex0, v0, convexAngle);
        vec2.rotate(worldVertex1, v1, convexAngle);
        add(worldVertex0, worldVertex0, convexOffset);
        add(worldVertex1, worldVertex1, convexOffset);

        sub(r0, worldVertex0, point);
        sub(r1, worldVertex1, point);
        var cross = vec2.crossLength(r0,r1);

        if(lastCross===null){
            lastCross = cross;
        }

        // If we got a different sign of the distance vector, the point is out of the polygon
        if(cross*lastCross <= 0){
            return false;
        }
        lastCross = cross;
    }
    return true;
}