function ray_intersect(ray, obj) {
    let hitObj = undefined;
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; ++i) {
            hitObj = ray_intersect(ray, obj[i]) || hitObj;
        }
        return hitObj;
    }

    // Default to an infinite ray
    if (ray.length === undefined) {
        ray.length = Infinity;
    }

    const scaleX = obj.scale ? obj.scale.x : 1;
    const scaleY = obj.scale ? obj.scale.y : 1;

    const pos = $maybeApplyPivot(obj.pos, obj.pivot, obj.angle, obj.scale);
    
    if (obj.size) {
        // Normalize the direction
        let inv = 1 / $Math.hypot(ray.dir.x, ray.dir.y);
        ray.dir.x *= inv; ray.dir.y *= inv;
        
        if (obj.shape === 'disk') {
            // ray-disk (https://www.geometrictools.com/Documentation/IntersectionLine2Circle2.pdf)
            let dx = ray.pos.x - pos.x, dy = ray.pos.y - pos.y;
            if (dx * dx + dy * dy * 4 <= $Math.abs(obj.size.x * obj.size.y * scaleX * scaleY)) {
                // Origin is inside the disk, so instant hit and no need
                // to look at children
                ray.length = 0;
                return obj;
            } else {
                // Origin is outside of the disk.
                const b = ray.dir.x * dx + ray.dir.y * dy
                const discrim = b*b - (dx*dx + dy*dy - 0.25 * obj.size.x * obj.size.y * scaleX * scaleY);
                if (discrim >= 0) {
                    const a = $Math.sqrt(discrim);
                    
                    // Start with the smaller root
                    let t = -b - a;
                    if (t < 0) {
                        // Try the larger root
                        t = -b + a;
                    }
                    
                    if ((t >= 0) && (t < ray.length)) {
                        hitObj = obj;
                        ray.length = t;
                    }
                }            
            }
        } else {
            // Move to the box's translational frame
            let toriginX = ray.pos.x - pos.x;
            let toriginY = ray.pos.y - pos.y;
            
            // Take the ray into the box's rotational frame
            const angle = (obj.angle || 0) * rotation_sign();
            const c = $Math.cos(angle), s = $Math.sin(angle);

            const originX = toriginX * c + toriginY * s;
            const originY =-toriginX * s + toriginY * c;

            const directionX = ray.dir.x * c + ray.dir.y * s;
            const directionY =-ray.dir.x * s + ray.dir.y * c;

            const radX = obj.size.x * 0.5 * scaleX;
            const radY = obj.size.y * 0.5 * scaleY;

            // Perform ray vs. oriented box intersection
            // (http://jcgt.org/published/0007/03/04/)

            const winding = ($Math.max(abs(originX / radX),
                                      abs(originY / radY)) < 1.0) ? -1 : 1;

            const sgnX = -$Math.sign(directionX);
            const sgnY = -$Math.sign(directionY);
            
            // Distance to edge lines
            const dX = (radX * winding * sgnX - originX) / directionX;
            const dY = (radY * winding * sgnY - originY) / directionY;

            const testX = (dX >= 0) && ($Math.abs(originY + directionY * dX) < radY);
            const testY = (dY >= 0) && ($Math.abs(originX + directionX * dY) < radX);

            if (testX) {
                if (dX < ray.length) {
                    ray.length = dX;
                    hitObj = obj;
                }
            } else if (testY && (dY < ray.length)) {
                ray.length = dY;
                hitObj = obj;
            }
        }
    }

    // Test children
    if (obj.child_array) {
        hitObj = ray_intersect(ray, obj.child_array) || hitObj;
    }

    return hitObj;
}