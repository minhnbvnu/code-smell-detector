function noise(octaves, x, y, z) {
    if (Array.isArray(x)) {
        z = x[2];
        y = x[1];
        x = x[0];
    } else if (x.x !== undefined) {
        z = x.z;
        y = x.y;
        x = x.x;
    }
    
    // Set any missing axis to zero
    x = x || 0;
    y = y || 0;
    z = z || 0;

    let temp = $Math.round(octaves);
    if (octaves - temp > 1e-10) {
        // Catch the common case where the order of arguments was swapped
        // by recognizing fractions in the octave value
        $error("noise(octaves, x, y, z) must take an integer number of octaves");
    } else {
        octaves = temp >>> 0;
    }

    octaves = $Math.max(1, octaves);
    
    // Maximum value is 1/2 + 1/4 + 1/8 ... from the straight summation.
    // The max is always pow(2, -octaves) less than 1.
    // So, divide each term by (1-pow(2,-octaves)) as well as
    // its octave scaling.
    //
    // UNoptimized: k = 1 / (1 - $Math.pow(2, -octaves));
    let v = 0, k = 1 / (1 - 1 / (1 << octaves));
    
    const stepx = 110, stepy = 241, stepz = 171;

    if ($Math.abs(z) > 1e-8) {
        // Full 3D
    
        for (; octaves > 0; --octaves) {        
            const ix = $Math.floor(x), iy = $Math.floor(y), iz = $Math.floor(z);
            const fx = x - ix,         fy = y - iy,         fz = z - iz;
            
            // For performance, compute the base input to a 1D hash
            // from the integer part of the argument and the
            // incremental change to the 1D based on the 3D -> 1D
            // wrapping
            const n = ix * stepx + iy * stepy + iz * stepz;
            
            const ux = fx * fx * (3 - 2 * fx),
                  uy = fy * fy * (3 - 2 * fy),
                  uz = fz * fz * (3 - 2 * fz);
            
            v += ($lerp($lerp($lerp($nhash1(n), $nhash1(n + stepx), ux),
                              $lerp($nhash1(n + stepy), $nhash1(n + stepx + stepy), ux), uy),
                        $lerp($lerp($nhash1(n + stepz), $nhash1(n + stepx + stepz), ux),
                              $lerp($nhash1(n + stepy + stepz), $nhash1(n + stepx + stepy + stepz), ux), uy), uz) - 0.5) * k;
            
            // Grab successive octaves from very different parts of
            // the space, and double the frequency
            x += x + 109;
            y += y + 31;
            z += z + 57;
            k *= 0.5;
        }
    } else {
        // Optimized 2D, where the z terms will all be zero. See above for implementation comments.
        x = Math.fround(x);
        y = Math.fround(y);
        for (; octaves > 0; --octaves) {     
            const ix = $Math.floor(x), iy = $Math.floor(y);
            const fx = x - ix, fy = y - iy;
            const n = ix * stepx + iy * stepy;
            
            const ux = fx * fx * (3 - fx - fx),
                  uy = fy * fy * (3 - fy - fy);

            v += ($lerp($lerp($nhash1(n),         $nhash1(n + stepx),         ux),
                        $lerp($nhash1(n + stepy), $nhash1(n + stepx + stepy), ux), uy) - 0.5) * k;

            x += x + 109;
            y += y + 31;
            k *= 0.5;
        }
    }
    
    return v;
}