function $executePLY(cmd) {
    const clipX1 = cmd.clipX1, clipY1 = cmd.clipY1,
          clipX2 = cmd.clipX2, clipY2 = cmd.clipY2;
    const points = cmd.points;
    const numPoints = points.length >> 1;
    const color = cmd.color, outline = cmd.outline;
    
    // Fill
    if (color & 0xf000) {
        const shift = ((outline & 0xf000) && (outline !== color)) ? 0.5 : 0;
        // For each non-horizontal edge, store:
        //
        //    [startX, startY, dx/dy slope, vertical height].
        //
        // These are the values needed for the edge-intersection test.  Add edges so that the
        // start Y coordinate is less than the end one.
        const edgeArray = [];

        // vertical bounds on the triangle
        let y0 = clipY2 + 1, y1 = clipY1 - 1;
        
        function addEdge(Sx, Sy, Ex, Ey) {
            if (Sy < Ey) {
                // Update bounding box
                if (Sy < y0) { y0 = Sy; }
                if (Ey > y1) { y1 = Ey; }
                edgeArray.push([Sx, Sy, (Ex - Sx) / (Ey - Sy), Ey - Sy]);
            } else if (Sy > Ey) {
                addEdge(Ex, Ey, Sx, Sy);
            }
        }

        // Add all edges
        for (let p = 0; p < points.length - 3; p += 2) {
            addEdge(points[p], points[p + 1], points[p + 2], points[p + 3]);
        }
        {
            // Wraparound to close the polygon
            const p = points.length - 2;
            addEdge(points[p], points[p + 1], points[0], points[1]);
        }

        // Intentionally left as a float to avoid int->float
        // conversion within the inner loop
        y0 = $Math.max(clipY1, $Math.floor(y0));
        y1 = $Math.min(clipY2, $Math.floor(y1));
        for (let y = y0; y <= y1; ++y) {
            
            // For this scanline, intersect the edge lines of the triangle.
            // As a convex polygon, we can simply intersect ALL edges and then
            // take the min and max intersections.
            let x0 = Infinity, x1 = -Infinity;
            for (let i = edgeArray.length - 1; i >= 0; --i) {
                const edge = edgeArray[i];
                const edgeX = edge[0], edgeY = edge[1], slope = edge[2], edgeHeight = edge[3];

                // Find the intersection
                const dy = y - edgeY;
                if ((dy >= 0) && (dy <= edgeHeight)) {
                    const x = edgeX + dy * slope;
                    x0 = $Math.min(x0, x);
                    x1 = $Math.max(x, x1);
                }
            }

            // If there was a nonzero line length, draw it
            if (x0 + shift <= x1 - shift) {
                $hline(x0 + shift, y, x1 - shift, color, clipX1, clipY1, clipX2, clipY2);
            }
        }
    }

    if ((outline & 0xf000) && (outline !== color)) {
        for (let p = 0; p < points.length - 3; p += 2) {
            $line(points[p], points[p + 1], points[p + 2], points[p + 3], outline, clipX1, clipY1, clipX2, clipY2, false, true);
        }
        {
            // Wraparound to close the polygon
            const p = points.length - 2;
            $line(points[p], points[p + 1], points[0], points[1], outline, clipX1, clipY1, clipX2, clipY2, false, true);
        }
    }
}