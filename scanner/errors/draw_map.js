function draw_map(map, min_layer, max_layer, replacements, pos, angle, scale, z_shift, override_color, override_blend) {
    if ($skipGraphics) { return; }
    
    if (! map.layer && map.map && (arguments.length === 1)) {
        // named argument version
        min_layer = map.min_layer;
        max_layer = map.max_layer;
        replacements = map.replacement_array;
        pos = map.pos;
        angle = map.angle;
        scale = map.scale;
        override_color = map.override_color;
        override_blend = map.override_blend;
        z_shift = map.z;
        map = map.map; 
    }

    const multiply = override_blend === 'multiply';
    if (override_color) {
        // have to clone and convert to RGB space
        override_color = rgba(override_color);
    }

    if (min_layer === undefined) { min_layer = 0; }

    if (max_layer === undefined) { max_layer = map.layer.length - 1; }

    if ((typeof $camera.zoom === 'function') && (min_layer !== max_layer)) {
        // Must draw layers separately when there is a zoom function.
        // Draw in order from back to front to preserve z-order.
        for (let L = min_layer; L <= max_layer; ++L) {
            draw_map(map, L, L, replacements, pos, angle, scale, z_shift, override_color, override_blend);
        }
        return;
    }
    
    if (typeof scale === 'number') { scale = xy(scale, scale); }

    if (pos === undefined) { pos = xy(0, 0); }

    if (angle === undefined) { angle = 0; }

    if (scale === undefined) { scale = xy(1, 1); }

    if (z_shift === undefined) {
        z_shift = pos.z;
    }
    z_shift = z_shift || 0;
    let z_pos = (pos.z === undefined) ? z_shift : pos.z;
    let z_order = z_shift;

    override_color = override_color ? $colorToUint16(override_color) : 0;

    if (($camera.x !== 0) || ($camera.y !== 0) || ($camera.angle !== 0) || ($camera.zoom !== 1)) {
        // Use the z-value from the lowest layer for perspective. If the zoom is a
        // function, then draw_map() guarantees that there is only one
        // layer at a time!
        const z = (min_layer * map.z_scale + map.z_offset + z_pos) - $camera.z;

        // Transform the arguments to account for the camera
        const mag = $zoom(z);
        const C = $Math.cos($camera.angle) * mag, S = $Math.sin($camera.angle * rotation_sign()) * mag;
        const x = pos.x - $camera.x, y = pos.y - $camera.y;
        pos = {x: x * C + y * S, y: y * C - x * S};
        angle -= $camera.angle;
        scale = {x: scale.x * mag, y: scale.y * mag};
    }

    if (replacements !== undefined) {
        if (! Array.isArray(replacements)) { $error('The replacements for draw_map() must be an array'); }
        if (replacements.length & 1 !== 0) { $error('There must be an even number of elements in the replacements array'); }
        // Convert to a map for efficiency (we need to copy anyway)
        const array = replacements;
        replacements = new Map();
        const N = array.length;
        for (let i = 0; i < N; i += 2) {
            replacements.set(array[i], array[i + 1]);
        }
    }

    // Compute the map axes in draw space
    const drawU = xy($Math.cos(angle), $Math.sin(angle * rotation_sign()));
    const drawV = perp(drawU);
    drawU.x *= scale.x; drawU.y *= scale.x;
    drawV.x *= scale.y; drawV.y *= scale.y;

    const spriteSizeX = map.sprite_size.x;
    const spriteSizeY = map.sprite_size.y;
    
    // Handle map wrapping with a 3x3 grid
    const oldDrawOffsetX = $offsetX, oldDrawOffsetY = $offsetY;
    for (let shiftY = -1; shiftY <= +1; ++shiftY) {
        if (! map.loop_y && shiftY !== 0) { continue; }
        
        for (let shiftX = -1; shiftX <= +1; ++shiftX) {
            if (! map.loop_x && shiftX !== 0) { continue; }

            // Shift amount for this instance of the tiled map
            const mapSpaceOffset = xy(map.size.x * map.sprite_size.x * shiftX,
                                      map.size.y * map.sprite_size.y * shiftY);
            $offsetX = oldDrawOffsetX + $scaleX * (drawU.x * mapSpaceOffset.x + drawV.x * mapSpaceOffset.y);
            $offsetY = oldDrawOffsetY + $scaleY * (drawU.y * mapSpaceOffset.x + drawV.y * mapSpaceOffset.y);
            
            // Take the screen-space clip coordinates to draw coords.
            // This does nothing if there is no offset or scale
            const drawClip1 = xy(($clipX1 - $offsetX) / $scaleX, ($clipY1 - $offsetY) / $scaleY);
            const drawClip2 = xy(($clipX2 - $offsetX) / $scaleX, ($clipY2 - $offsetY) / $scaleY);

            // Take the draw-space clip coordinates to the min/max map
            // coords.  When rotated, this may cause significant
            // overdraw, as snapping to an axis-aligned bounding box
            // in the rotated map space could be fitting a diamond
            // with a square. 
            let mapX1, mapX2, mapY1, mapY2;
            {
                //$console.log(transform_to(pos, angle, scale, drawClip2));
                // Apply pos, angle, scale.
                // We have to consider all four corners for the rotation case.
                const temp1 = transform_ws_to_map_space(map, transform_to(pos, angle, scale, drawClip1)),
                      temp2 = transform_ws_to_map_space(map, transform_to(pos, angle, scale, drawClip2)),
                      temp3 = transform_ws_to_map_space(map, transform_to(pos, angle, scale, xy(drawClip1.x, drawClip2.y))),
                      temp4 = transform_ws_to_map_space(map, transform_to(pos, angle, scale, xy(drawClip2.x, drawClip1.y)));
                
                mapX1 = $Math.floor($Math.min(temp1.x, temp2.x, temp3.x, temp4.x));
                mapX2 = $Math.ceil ($Math.max(temp1.x, temp2.x, temp3.x, temp4.x));
                
                mapY1 = $Math.floor($Math.min(temp1.y, temp2.y, temp3.y, temp4.y));
                mapY2 = $Math.ceil ($Math.max(temp1.y, temp2.y, temp3.y, temp4.y));

                mapX1 = $Math.max(mapX1, 0);
                mapX2 = $Math.min(mapX2, map.size.x - 1);
                
                mapY1 = $Math.max(mapY1, 0);
                mapY2 = $Math.min(mapY2, map.size.y - 1);
            }

            // Setup draw calls for the layers. We process each cell
            // "vertically" within all layers from top to bottom in
            // the following code so that lower layers can be culled
            // when occluded.
            
            const numLayers = max_layer - min_layer + 1;
            const layerSpriteArrays = [];
            const layerZOrder = [];
            layerSpriteArrays.length = numLayers;
            layerZOrder.length = numLayers;
            for (let L = min_layer; L <= max_layer; ++L) {
                const layer = map.layer[L];
                const i = L - min_layer;
                
                layerZOrder[i] = (L * map.z_scale + map.z_offset + z_order - $camera.z) * $scaleZ + $offsetZ;
                
                const layer_z_pos = (L * map.z_scale + map.z_offset + z_pos - $camera.z) * $scaleZ + $offsetZ;
                if (layer_z_pos >= $clipZ1 && layer_z_pos <= $clipZ2) {
                    layerSpriteArrays[i] = [];
                } 
            }

            // Compute the sprite calls. We pack them together into big
            // layer calls to reduce sorting, but since the map is
            // mutable we have to actually copy all elements for those
            // calls.

            const radius = $Math.hypot(map.sprite_size.x, map.sprite_size.y) * 0.5 *
                  $Math.max($Math.abs(scale.x), $Math.abs(scale.y));
            
            for (let mapX = mapX1; mapX <= mapX2; ++mapX) {
                for (let mapY = mapY1; mapY <= mapY2; ++mapY) {
                            
                    // Compute the screen coordinates. Sprites are
                    // rendered from centers, so offset each by 1/2
                    // the tile size.
                    const x = (mapX + 0.5) * map.sprite_size.x + map.offset.x;
                    const y = (mapY + 0.5) * map.sprite_size.y + map.offset.y;
                    
                    const screenX = (drawU.x * x + drawV.x * y + pos.x) * $scaleX + $offsetX;
                    const screenY = (drawU.y * x + drawV.y * y + pos.y) * $scaleY + $offsetY;
                    
                    // If there is rotation, this particular sprite
                    // column might be off screen
                    if ((screenX + radius < $clipX1 - 0.5) && (screenY + radius < $clipY1 - 0.5) &&
                        (screenX >= $clipX2 + radius + 0.5) && (screenY >= $clipY2 + radius + 0.5)) {
                        continue;
                    }
                    
                    // Process layers from the top down, so that we can occlusion cull
                    for (let L = max_layer; L >= min_layer; --L) {
                        const i = L - min_layer;
                        
                        // Sprite calls in this layer
                        const data = layerSpriteArrays[i];
                                                
                        if (! data) {
                            // This layer is z-clipped
                            continue;
                        }

                        let sprite = map.layer[L][mapX][mapY];
                    
                        if (sprite === undefined) {
                            // Empty sprite cell
                            continue;
                        }
                            
                        if (replacements && replacements.has(sprite)) {
                            // Perform replacement
                            sprite = replacements.get(sprite);
                            
                            // ...which may be empty
                            if (sprite === undefined) { continue; }
                        }

                        const sprElt = {
                            spritesheetIndex: sprite.$spritesheet.$index[0],
                            cornerX:  sprite.$x,
                            cornerY:  sprite.$y,
                            sizeX:    sprite.size.x,
                            sizeY:    sprite.size.y,
                            angle:    angle,
                            scaleX:   scale.x * sprite.scale.x,
                            scaleY:   scale.y * sprite.scale.y,
                            hasAlpha: sprite.$hasAlpha,
                            opacity:  1,
                            override_color: override_color,
                            multiply: multiply,
                            x:        screenX,
                            y:        screenY
                        };

                        /*
                        // Expensive assertion disabled
                        $console.assert(sprElt.spritesheetIndex >= 0 &&
                                        sprElt.spritesheetIndex < $spritesheetArray.length,
                                        sprite.$name + ' sprite has a bad index: ' + sprElt.spritesheetIndex);
                        */

                        data.push(sprElt);
                        
                        if (! sprite.$hasAlpha) {
                            // No need to process other layers, since this sprite
                            // occludes everything under it.
                            break;
                        } // occlusion cull
                    } // y
                } // x
            } // For each layer L

            // Submit the non-empty draw calls
            for (let i = 0; i < numLayers; ++i) {
                // Sprite calls in this layer
                const data = layerSpriteArrays[i];
                const baseZOrder = layerZOrder[i];
                
                // Push the command, if there were sprites.
                // Note that the z will be offset based on the order
                // of submission even if all baseZ values are the same.
                if (data && data.length > 0) {
                    $addGraphicsCommand({
                        opcode: 'SPR',
                        baseZ:  baseZOrder,
                        z:      baseZOrder,
                        data:   data
                    });
                }
            } // for each layer
        } // loop_x
    } // loop_y

    $offsetX = oldDrawOffsetX;
    $offsetY = oldDrawOffsetY;
}