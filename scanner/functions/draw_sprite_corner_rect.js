function draw_sprite_corner_rect(CC, corner, size, z) {
    if ($skipGraphics) { return; }
    
    if (! (CC && CC.$spritesheet)) {
        $error('Called draw_sprite_corner_rect() on an object that was not a sprite asset. (' + unparse(CC) + ')');
    }

    let z_order = z, z_pos = corner.z;
    if (z_order === undefined) { z_order = z_pos || 0; }
    if (z_pos === undefined) { z_pos = z_order; }
    z_pos -= $camera.z;
    // Not used after here
    //z_order -= $camera.z;
    
    const skx = (z_pos * $skewXZ), sky = (z_pos * $skewYZ);
    let x1 = (corner.x + skx) * $scaleX + $offsetX, y1 = (corner.y + sky) * $scaleY + $offsetY;
    let x2 = (corner.x + size.x + skx) * $scaleX + $offsetX, y2 = (corner.y + size.y + sky) * $scaleY + $offsetY;

    // Not used after here
    //z_pos = z_pos * $scaleZ + $offsetZ;
    //z_order = z_order * $scaleZ + $offsetZ;

    // Sort coordinates
    let t1 = $Math.min(x1, x2), t2 = $Math.max(x1, x2);
    x1 = t1; x2 = t2;
    
    t1 = $Math.min(y1, y2), t2 = $Math.max(y1, y2);
    y1 = t1; y2 = t2;

    // Lock to the pixel grid before computing offsets
    x1 = $Math.round(x1); y1 = $Math.round(y1);
    x2 = $Math.floor(x2 - 0.5); y2 = $Math.floor(y2 - 0.5);
    
    const centerX = (x2 + x1) / 2, centerY = (y2 + y1) / 2;

    // We always put a tile in the center, so the width is based on
    // the ceiling of the *half* width, not the full width. Note the
    // the number of tiles in each direction is therefore guaranteed
    // to be odd.
    const numTilesX = 1 + $Math.ceil((x2 - x1 + 1) / (2 * CC.size.x) - 0.49) * 2;
    const numTilesY = 1 + $Math.ceil((y2 - y1 + 1) / (2 * CC.size.y) - 0.49) * 2;
    
    // Iterate over center box, clipping at its edges
    const spriteCenter = {x:0, y:0, z:corner.z};
    $pushGraphicsState(); {
        intersect_clip(xy(x1, y1), xy(x2 - x1 + 1, y2 - y1 + 1));
        
        for (let y = 0; y < numTilesY; ++y) {
            // Transform individual pixel coordinates *back* to game
            // coords for the draw_sprite call to handle clipping and
            // insertion into the queue.
            spriteCenter.y = ((centerY + (y - (numTilesY - 1) * 0.5) * CC.size.y) - $offsetY) / $scaleY;
            for (let x = 0; x < numTilesX; ++x) {
                spriteCenter.x = ((centerX + (x - (numTilesX - 1) * 0.5) * CC.size.x) - $offsetX) / $scaleX;
                draw_sprite(CC, spriteCenter, 0, undefined, 1, z);
            }
        }
    } $popGraphicsState();
    
    // Generate relative sprites
    const LT = CC.$spritesheet[$Math.max(0, CC.$tileX - 1)][$Math.max(0, CC.$tileY - 1)];
    const CT = CC.$spritesheet[$Math.max(0, CC.$tileX    )][$Math.max(0, CC.$tileY - 1)];
    const RT = CC.$spritesheet[$Math.max(0, CC.$tileX + 1)][$Math.max(0, CC.$tileY - 1)];

    const LC = CC.$spritesheet[$Math.max(0, CC.$tileX - 1)][$Math.max(0, CC.$tileY    )];
    const RC = CC.$spritesheet[$Math.max(0, CC.$tileX + 1)][$Math.max(0, CC.$tileY    )];

    const LB = CC.$spritesheet[$Math.max(0, CC.$tileX - 1)][$Math.max(0, CC.$tileY + 1)];
    const CB = CC.$spritesheet[$Math.max(0, CC.$tileX    )][$Math.max(0, CC.$tileY + 1)];
    const RB = CC.$spritesheet[$Math.max(0, CC.$tileX + 1)][$Math.max(0, CC.$tileY + 1)];

    // Centers of the sprites on these edges
    const left   = ((x1 - CC.size.x * 0.5) - $offsetX) / $scaleX - 0.5;
    const right  = ((x2 + CC.size.x * 0.5) - $offsetX) / $scaleX + 1;
    const top    = ((y1 - CC.size.y * 0.5) - $offsetY) / $scaleY - 0.5;
    const bottom = ((y2 + CC.size.y * 0.5) - $offsetY) / $scaleY + 1;
    
    // Top and bottom
    $pushGraphicsState(); {
        intersect_clip(xy(x1, $clipY1), xy(x2 - x1 + 1, $clipY2 - $clipY1 + 1));
        
        for (let x = 0; x < numTilesX; ++x) {
            spriteCenter.x = ((centerX + (x - (numTilesX - 1) * 0.5) * CC.size.x) - $offsetX) / $scaleX;

            spriteCenter.y = top;
            draw_sprite(CT, spriteCenter, 0, undefined, 1, z);
            
            spriteCenter.y = bottom;
            draw_sprite(CB, spriteCenter, 0, undefined, 1, z);
        }
    } $popGraphicsState();

    // Sides
    $pushGraphicsState(); {
        intersect_clip(xy($clipX1, y1), xy($clipX2 - $clipX1 + 1, y2 - y1 + 1));
        
        for (let y = 0; y < numTilesY; ++y) {
            spriteCenter.y = ((centerY + (y - (numTilesY - 1) * 0.5) * CC.size.y) - $offsetY) / $scaleY;

            spriteCenter.x = left;
            draw_sprite(LC, spriteCenter, 0, undefined, 1, z);
            
            spriteCenter.x = right;
            draw_sprite(RC, spriteCenter, 0, undefined, 1, z);
        }
    } $popGraphicsState();

    // Corners (no new clipping needed)
    {
        // Left Top
        spriteCenter.x = left; spriteCenter.y = top;
        draw_sprite(LT, spriteCenter, 0, undefined, 1, z);
        
        // Right Top
        spriteCenter.x = right;
        draw_sprite(RT, spriteCenter, 0, undefined, 1, z);

        // Left Bottom
        spriteCenter.x = left; spriteCenter.y = bottom;
        draw_sprite(LB, spriteCenter, 0, undefined, 1, z);

        // Right Bottom
        spriteCenter.x = right;
        draw_sprite(RB, spriteCenter, 0, undefined, 1, z);
    }
}