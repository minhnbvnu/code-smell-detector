function $executeSPR(metaCmd) {
    // Note that these are always integers, which we consider
    // pixel centers.
    const clipX1 = metaCmd.clipX1, clipY1 = metaCmd.clipY1,
          clipX2 = metaCmd.clipX2, clipY2 = metaCmd.clipY2;

    // For each sprite in the array
    const data = metaCmd.data;
    for (let i = 0; i < data.length; ++i) {
        const cmd = data[i];

        let opacity = cmd.opacity;
        const override_color = cmd.override_color;
        
        // Compute the net transformation matrix

        // Source bounds, inclusive
        const srcX1 = cmd.cornerX, srcX2 = cmd.cornerX + cmd.sizeX - 1,
              srcY1 = cmd.cornerY, srcY2 = cmd.cornerY + cmd.sizeY - 1;
        
        // The net forward transformation is: (note that SX, SY = source center, not scale!)
        // c = cos, s = sin, f = scale
        //
        // [srcx]   [1 0 SX][1/fx 0   0][ c -s 0][1 0 -DX][dstx]
        // [srcy] = [0 1 SY][0   1/fy 0][ s  c 0][0 1 -DY][dsty]
        // [ 1  ]   [0 0  1][0    0   1][ 0  0 1][0 0   1][ 1  ]
        //
        // [srcx]   [1 0 SX][c/fx -s/fx 0][1 0 -DX][dstx]
        // [srcy] = [0 1 SY][s/fy  c/fy 0][0 1 -DY][dsty]
        // [ 1  ]   [0 0  1][  0    0   1][0 0   1][ 1  ]
        //
        // A = c/fx, B = -s/fx, C = s/fy, D = c/fy
        //
        // [srcx]   [1 0 SX][A B 0][1 0 -DX][dstx]
        // [srcy] = [0 1 SY][C D 0][0 1 -DY][dsty]
        // [ 1  ]   [0 0  1][0 0 1][0 0   1][ 1  ]
        //
        // [srcx]    [A B (SX - A*DX - B*DY)][dstx]
        // [srcy] =  [C D (SY - C*DX - D*DY)][dsty]
        //                                   [ 1  ]
        //
        // The inverse transformation for computing destination bounds is:
        //  
        // [dstx]   [1 0 DX][ c s 0][fx  0 0][1 0 -SX][srcx]
        // [dsty] = [0 1 DY][-s c 0][ 0 fy 0][0 1 -SY][srcy]
        // [ 1  ]   [0 0  1][ 0 0 1][ 0  0 1][0 0   1][ 1  ]
        //
        // E = c*fx, F = -s*fx, G = s*fy, H = c*fy
        //
        // [dstx]   [E F DX][srcx - SX]
        // [dsty] = [G H DY][srcy - SY]
        //                  [   1     ]
        
        // Source and destination centers
        const DX = cmd.x, DY = cmd.y,
              SX = srcX1 + cmd.sizeX * 0.5, SY = srcY1 + cmd.sizeY * 0.5;

        // Snap nearly 0 or 1 values to perfect to avoid
        // falling into awkward roundoff cases
        const angle = ($Math.abs(cmd.angle) < 1e-8) ? 0 : cmd.angle;
        const cos = $Math.cos(angle), sin = $Math.sin(angle);
        const fx = $Math.abs(cmd.scaleX - 1) < 1e-8 ? 1 : cmd.scaleX,
              fy = $Math.abs(cmd.scaleY - 1) < 1e-8 ? 1 : cmd.scaleY;

        const A = cos/fx, B = -sin/fx, C =  sin/fy, D = cos/fy;
        const E = cos*fx, F =  sin*fx, G = -sin*fy, H = cos*fy;
        const I = DX - SX*E - SY*G, J = DY - SX*F - SY*H;

        ////////////////////////////////////////////////////////////////////////////////
        // Compute the (inclusive) destination bounds by projecting all
        // four corners from texture space to screen space
        
        let dstX1 = Infinity, dstX2 = -Infinity,
            dstY1 = Infinity, dstY2 = -Infinity;

        for (let i = 0; i <= 1; ++i) {
            for (let j = 0; j <= 1; ++j) {
                // Coordinates of the bounding box extremes
                const srcX = srcX1 + i * cmd.sizeX,
                      srcY = srcY1 + j * cmd.sizeY;

                // Transform from texture space to pixel space
                let tmp = E * (srcX - SX) + G * (srcY - SY) + DX;
                dstX1 = $Math.min(tmp, dstX1); dstX2 = $Math.max(tmp, dstX2);
                
                tmp     = F * (srcX - SX) + H * (srcY - SY) + DY;
                dstY1 = $Math.min(tmp, dstY1); dstY2 = $Math.max(tmp, dstY2);
            }
        }

        // Round the bounding box using the draw_rect rules for inclusive integer
        // bounds with open top and left edges at pixel center samples.
        dstX1 = $Math.round(dstX1); dstY1 = $Math.round(dstY1);
        dstX2 = $Math.floor(dstX2 - 0.5); dstY2 = $Math.floor(dstY2 - 0.5);

        // Restrict to the clipping region
        dstX1 = $Math.max(dstX1, clipX1); dstY1 = $Math.max(dstY1, clipY1);
        dstX2 = $Math.min(dstX2, clipX2); dstY2 = $Math.min(dstY2, clipY2);

        // Iterate over *output* pixel centers in this region. Because the
        // transformed texel centers won't usually land exactly on pixel
        // centers, we have to be conservative with the bounds here.
        //
        // Don't snap the bounds to integers...we want to hit points that
        // correspond to texel centers in the case where there is no
        // rotation or scale (we'll end up rounding the actual destination
        // pixels later and stepping in integer increments anyway).

        if (cmd.spritesheetIndex >= $spritesheetArray.length) {
            $console.log('GPU spritesheetIndex out of bounds at:', cmd);
        }
        $console.assert(cmd.spritesheetIndex !== undefined &&
                        cmd.spritesheetIndex >= 0 &&
                        cmd.spritesheetIndex < $spritesheetArray.length,
                        'spritesheetIndex out of bounds:', cmd.spritesheetIndex);
        // May be reassigned below when using flipped X values
        let srcData = $spritesheetArray[cmd.spritesheetIndex].$uint16Data;
        console.assert(srcData.width !== undefined);

        const srcDataWidth = srcData.width >>> 0;
        
        if (($Math.abs($Math.abs(A) - 1) < 1e-10) && ($Math.abs(B) < 1e-10) &&
            ($Math.abs(C) < 1e-10) && ($Math.abs($Math.abs(D) - 1) < 1e-10) &&
            (! override_color)) {

            // console.log('simple', srcData[0].toString(16), srcData[1].toString(16), srcData[2].toString(16));

            // Simple case; x and y-axis uniform scale, no rotation, and no alpha
            // test. Use a memcpy.  The x and y-axes may be inverted, and there
            // can be xy translation applied. This branch is primarily
            // here to accelerate map rendering.

            // All of the "| 0" are to force values to integers, which massively
            // improves performance on Safari (5x in some cases)

            const width = (dstX2 - dstX1 + 1) | 0;
            if (width >= 1) {
                const srcY = ((dstY1 + 0.4999 - DY) * $Math.sign(D) + SY) | 0;
                let srcOffset = ((((dstX1 + 0.4999 - DX) + SX) | 0) + srcY * srcDataWidth) | 0;
                let dstOffset = (dstX1 + dstY1 * $SCREEN_WIDTH) | 0;
                const srcStep = (srcDataWidth * $Math.sign(D)) | 0;

                if (A < 0) {
                    // Use the flipped version
                    srcOffset = (srcOffset + srcDataWidth - 2 * SX) | 0;
                    srcData = $spritesheetArray[cmd.spritesheetIndex].$uint16DataFlippedX;
                }
                if ((! cmd.hasAlpha) && ($Math.abs(opacity - 1) < 1e-10)) {
                    // Memcpy case
                    for (let dstY = dstY1; dstY <= dstY2; ++dstY) {
                        //console.log(srcData.subarray(srcOffset, srcOffset + width));
                        // This TypedArray.set call saves about 3.5
                        // ms/frame compared to an explicit horizontal
                        // loop for map rendering on Firefox. Chrome
                        // and Safari are fast even for the general
                        // case. So, this isn't necessary on those
                        // browsers, but it doesn't hurt.
                        
                        // console.assert(dstOffset + width <= $screen.length, `dstX1=${dstX1}, dstX2 = ${dstX2}, $screen.length = ${$screen.length}, width = ${width}, dstOffset = ${dstOffset}, dstOffset % $SCREEN_WIDTH = ${dstOffset % $SCREEN_WIDTH}, dstY = ${dstY}, dstY2 = ${dstY2}`);
                        // console.assert(srcOffset + width <= srcData.length);
                        $screen.set(srcData.subarray(srcOffset, srcOffset + width), dstOffset);
                        
                        // Putting this increment at the bottom slightly
                        // improves Safari performance
                        dstOffset = (dstOffset + $SCREEN_WIDTH) | 0;
                        srcOffset = (srcOffset + srcStep) | 0;
                    } // dstY
                } else {
                    // Blending or alpha test case
                    for (let dstY = dstY1; dstY <= dstY2; ++dstY) {
                        for (let i = 0; i < width; ++i) {
                            // Forcing the read value back to an integer improves
                            // performance slightly on Safari (5%)
                            let color = srcData[srcOffset + i] >>> 0;
                            let a15 = color >>> 12;

                            // Test alpha *first* in this case, because quite often we'll be in a sprite
                            // with a lot of alpha === 0 pixels and not need to go further.
                            if (a15 !== 0) {
                                // Blending
                                if (opacity < 1) {
                                    // Make more transparent
                                    a15 = (a15 * opacity + 0.5) >>> 0;
                                }

                                if (a15 === 0xf) {
                                    // 100% alpha, no blend needed
                                    $screen[dstOffset + i] = (color | 0xF000) >>> 0;
                                } else if (a15 !== 0) {
                                    // Fractional alpha
                                
                                    // No need to force to unsigned int because the alpha channel of
                                    // the output is always 0xff
                                    const a = a15 * (1 / 15);
                                    const back = $screen[dstOffset + i] >>> 0;
                                    
                                    let result = 0xF000 >>> 0;
                                    result |= ((back & 0x0F00) * (1 - a) + (color & 0x0F00) * a + 0.5 * 0x100) & 0x0F00;
                                    result |= ((back & 0x00F0) * (1 - a) + (color & 0x00F0) * a + 0.5 * 0x010) & 0x00F0;
                                    result |= ((back & 0x000F) * (1 - a) + (color & 0x000F) * a + 0.5) & 0x000F;

                                    $screen[dstOffset + i] = result;
                                }
                            } // alpha > 0
                        } // column
                        
                        // Putting this increment at the bottom slightly
                        // improves Safari performance. Casting to integer
                        // MASSIVELY improves Safari performance.
                        dstOffset = (dstOffset + $SCREEN_WIDTH) | 0;
                        srcOffset = (srcOffset + srcStep) | 0;
                    } // row
                } // needs alpha
            } // width >= 1
        } else if (! override_color && (! cmd.hasAlpha) && ($Math.abs(opacity - 1) < 1e-10)) {
            // No blending case with rotation and scale
            dstY1 |= 0; dstY2 |= 0;
            for (let dstY = dstY1; dstY <= dstY2; ++dstY) {
                // Offset everything by 0.5 to transform the pixel
                // center. Needs to be *slightly* less in order to round
                // the correct way.
                const xterms = (dstY + 0.4999 - DY) * B + SX + (0.4999 - DX) * A;
                const yterms = (dstY + 0.4999 - DY) * D + SY + (0.4999 - DX) * C;
                
                let dstOffset = dstX1 + dstY * $SCREEN_WIDTH;
                
                for (let dstX = dstX1; dstX <= dstX2; ++dstX, ++dstOffset) {
                    const srcX = (dstX * A + xterms) | 0;
                    const srcY = (dstX * C + yterms) | 0;

                    if ((srcX >= srcX1) && (srcX <= srcX2) && (srcY >= srcY1) && (srcY <= srcY2)) {
                        // Inside the source sprite
                        $screen[dstOffset] = srcData[srcX + srcY * srcDataWidth];
                    } // clamp to source bounds
                } // dstX
            } // dstY
            
        } else {
            // General case.
            // Extract the common terms of blending into the override color
            const override = override_color;
            const override_a = 1 - (override >>> 12) * (1 / 15);
            const override_mode = (override_color && cmd.multiply) ? 3 : ((override_a === 1) ? 0 : (override_a === 0) ? 2 : 1);
            const override_b = (override & 0x0F00) * (1 - override_a) + 0.5;
            const override_g = (override & 0x00F0) * (1 - override_a) + 0.5;
            const override_r = (override & 0x000F) * (1 - override_a) + 0.5;

            // Float versions
            const override_fb = ((override >> 8) & 0xf) * (1 / 15);
            const override_fg = ((override >> 4) & 0xf) * (1 / 15);
            const override_fr = (override & 0xf) * (1 / 15);
            
            dstY1 |= 0; dstY2 |= 0;
            for (let dstY = dstY1; dstY <= dstY2; ++dstY) {
                // Offset everything by 0.5 to transform the pixel
                // center. Needs to be *slightly* less in order to round
                // the correct way.
                const xterms = (dstY + 0.4999 - DY) * B + SX + (0.4999 - DX) * A;
                const yterms = (dstY + 0.4999 - DY) * D + SY + (0.4999 - DX) * C;
                
                let dstOffset = (dstX1 + dstY * $SCREEN_WIDTH) | 0;
                
                for (let dstX = dstX1; dstX <= dstX2; ++dstX, ++dstOffset) {
                    const srcX = (dstX * A + xterms) | 0;
                    const srcY = (dstX * C + yterms) | 0;

                    if ((srcX >= srcX1) && (srcX <= srcX2) && (srcY >= srcY1) && (srcY <= srcY2)) {
                        // Inside the source sprite

                        // May be overriden below.
                        let color = srcData[srcX + srcY * srcDataWidth];
                        if (opacity < 1) {
                            // Make more transparent
                            
                            // 4 high bits
                            const alpha4 = ((color >>> 12) * opacity + 0.5) | 0;
                            color = ((alpha4 << 12) | (color & 0xFFF)) >>> 0;
                        }
                        
                        // the following is an inlining of: $pset(dstX, dstY, color, clipX1, clipY1, clipX2, clipY2);
                        
                        // Must be unsigned shift to avoid sign extension
                        const a15 = color >>> 12;
                        if (a15 === 0) {
                            // 0% alpha
                        } else {

                            if (override_mode === 0) {
                                // Common case, do nothing
                            } else if (override_mode === 1) {
                                // Blend
                                const src = color;
                                color &= 0xF000;
                                color |= (override_b + (src & 0x0F00) * override_a) & 0x0F00;
                                color |= (override_g + (src & 0x00F0) * override_a) & 0x00F0;
                                color |= (override_r + (src & 0x000F) * override_a) & 0x000F;
                            } else if (override_mode === 2) {
                                // Completely overwrite
                                color = (color & 0xF000) | (override & 0xFFF);
                            } else { // mode 3
                                // Multiply
                                const src = color;
                                color &= 0xF000;
                                color |= (override_fb * (src & 0x0F00) + (0.5 * 0x100)) & 0x0F00;
                                color |= (override_fg * (src & 0x00F0) + (0.5 * 0x010)) & 0x00F0;
                                color |= (override_fr * (src & 0x000F) +  0.5)          & 0x000F;
                            }

                            if (a15 === 0xf) {
                                // 100% alpha
                                $screen[dstOffset] = color;
                            } else if (a15 != 0) {
                                // Fractional alpha
                                
                                // No need to force to unsigned int because the alpha channel of the output is always 0xff
                                const a = a15 * (1 / 15);
                                const back = $screen[dstOffset];
                                let result = 0xF000;
                                
                                result |= ((back & 0x0F00) * (1 - a) + (color & 0x0F00) * a + 0.5 * 0x100) & 0x0F00;
                                result |= ((back & 0x00F0) * (1 - a) + (color & 0x00F0) * a + 0.5 * 0x010) & 0x00F0;
                                result |= ((back & 0x000F) * (1 - a) + (color & 0x000F) * a + 0.5) & 0x000F;
                                
                                $screen[dstOffset] = result;
                            }
                        }
                    } // clamp to source bounds
                } // i
            } // j
        } // if simple case
    } // for each sprite
}