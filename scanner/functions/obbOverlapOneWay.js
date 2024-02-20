function obbOverlapOneWay(A, B, offsetX, offsetY) {
        // Transform B in to A's reference frame and then use the
        // separating axis test.  Try to find an axis along which
        // the projection of B onto A does not overlap

        temp2.x = B.pos.x - offsetX;
        temp2.y = B.pos.y - offsetY;
        const center = $toFrame(A, temp2, temp);
        const angle  = (B.angle - A.angle) * rotation_sign();

        // Find the extremes of the corners of B along each axis of A
        const c = $Math.cos(angle);
        const s = $Math.sin(angle);

        let loX =  Infinity, loY =  Infinity;
        var hiX = -Infinity, hiY = -Infinity;

        // Four corners = four combinations of signs. Expand out the
        // vector operations to avoid memory allocation.
        for (let signX = -1; signX <= +1; signX += 2) {
            for (let signY = -1; signY <= +1; signY += 2) {
                const xx = signX * B.size.x * 0.5 * $Math.abs(B.scale.x);
                const yy = signY * B.size.y * 0.5 * $Math.abs(B.scale.y);
                const cornerX = xx *  c + yy * s;
                const cornerY = xx * -s + yy * c;

                loX = $Math.min(loX, cornerX);
                loY = $Math.min(loY, cornerY);

                hiX = $Math.max(hiX, cornerX);
                hiY = $Math.max(hiY, cornerY);
            }
        }

        loX += center.x;
        loY += center.y;
        hiX += center.x;
        hiY += center.y;
        
        // We can now perform an AABB test to see if there is no separating
        // axis under this projection
        return ((loX * 2 <= A.size.x * $Math.abs(A.scale.x)) && (hiX * 2 >= -A.size.x * $Math.abs(A.scale.x)) &&
                (loY * 2 <= A.size.y * $Math.abs(A.scale.y)) && (hiY * 2 >= -A.size.y * $Math.abs(A.scale.y)));
    }