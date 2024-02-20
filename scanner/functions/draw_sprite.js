function draw_sprite(spr, pos, angle, scale, opacity, z, override_color, override_blend, pivot) {
    if ($skipGraphics) { return; }

    if (spr && spr.pos && ! spr.sprite) { $error('sprite must not be nil for draw_sprite()'); }
    
    if (spr && spr.sprite) {
        // This is the "keyword" version of the function
        z = spr.z;
        opacity = spr.opacity;
        scale = spr.scale;
        angle = spr.angle;
        pos = spr.pos;
        override_color = spr.override_color;
        override_blend = spr.override_blend;
        pivot = spr.pivot;
        spr = spr.sprite;
    }

    if (! pos) { $error("pos must not be nil for draw_sprite()"); }

    const multiply = override_blend === 'multiply';

    if (opacity <= 0) { return; }

    if (Array.isArray(spr) && spr.sprite_size && Array.isArray(spr[0])) {
        // The sprite was a spritesheet. Grab the first element
        spr = spr[0][0];
    }

    if (! (spr && spr.$spritesheet && spr.$type === 'sprite')) {
        $error('Called draw_sprite() on an object that was not a sprite asset. (' + unparse(spr) + ')');
    }
    
    let z_order = z, z_pos = pos.z;
    if (z_order === undefined) { z_order = z_pos || 0; }
    if (z_pos === undefined) { z_pos = z_order; }
    z_pos -= $camera.z;
    z_order -= $camera.z;

    angle = angle || 0;

    pivot = pivot || spr.pivot;
    pos = $maybeApplyPivot(pos, pivot, angle, scale);

    if (($camera.x !== 0) || ($camera.y !== 0) || ($camera.angle !== 0) || ($camera.zoom !== 1)) {
        // Transform the arguments to account for the camera
        const mag = $zoom(z_pos);
        const C = $Math.cos($camera.angle) * mag, S = $Math.sin($camera.angle * rotation_sign()) * mag;
        const x = pos.x - $camera.x, y = pos.y - $camera.y;
        pos = {x: x * C + y * S, y: y * C - x * S};
        angle -= $camera.angle;

        switch (typeof scale) {
        case 'number': scale = {x: scale, y: scale}; break;
        case 'undefined': scale = {x: 1, y: 1}; break;
        }
        scale = {x: scale.x * mag, y: scale.y * mag};
    }
    
    const skx = z_pos * $skewXZ, sky = z_pos * $skewYZ;
    const x = (pos.x + skx) * $scaleX + $offsetX;
    const y = (pos.y + sky) * $scaleY + $offsetY;
    z_pos = z_pos * $scaleZ + $offsetZ;
    z_order = z_order * $scaleZ + $offsetZ;

    let scaleX = 1, scaleY = 1;
    if ((scale !== 0) && (typeof scale === 'number')) {
        scaleX = scaleY = scale;
    } if (scale && scale.x && scale.y) {
        scaleX = scale.x;
        scaleY = scale.y;
    }
    
    // Apply the sprite's own flipping
    scaleX *= spr.scale.x; scaleY *= spr.scale.y;
    
    opacity = $Math.max(0, $Math.min(1, (opacity === undefined) ? 1 : opacity));
    const radius = spr.$boundingRadius * $Math.max($Math.abs(scaleX), $Math.abs(scaleY));

    if ((opacity <= 0) || (x + radius < $clipX1 - 0.5) || (y + radius < $clipY1 - 0.5) ||
        (x >= $clipX2 + radius + 0.5) || (y >= $clipY2 + radius + 0.5) ||
        (z_pos < $clipZ1 - 0.5) || (z_pos >= $clipZ2 + 0.5)) {
        return;
    }

    // Don't use rotation_sign() on the angle, because the angle
    // WILL be interpreted as CCW when the queued command actually
    // executes.

    if (override_color) {
        // have to clone and convert to RGB space
        override_color = rgba(override_color);
    }

    const sprElt = {
        spritesheetIndex:  spr.$spritesheet.$index[0],
        cornerX:       spr.$x,
        cornerY:       spr.$y,
        sizeX:         spr.size.x,
        sizeY:         spr.size.y,
        
        angle:         (angle || 0),
        scaleX:        scaleX,
        scaleY:        scaleY,
        hasAlpha:      spr.$hasAlpha,
        opacity:       opacity,
        override_color: override_color ? $colorToUint16(override_color) : 0,
        multiply:      multiply,
        x:             x,
        y:             y
    };

    $console.assert(sprElt.spritesheetIndex >= 0 &&
                    spr.$name + ' has a bad index: ' + sprElt.spritesheetIndex);
    // Aggregate multiple sprite calls
    const prevCommand = $graphicsCommandList[$graphicsCommandList.length - 1];
    if (prevCommand && (prevCommand.baseZ === z_order) &&
        (prevCommand.opcode === 'SPR') &&
        (prevCommand.clipX1 === $clipX1) && (prevCommand.clipX2 === $clipX2) &&
        (prevCommand.clipY1 === $clipY1) && (prevCommand.clipY2 === $clipY2)) {
        // Modify the existing command to reduce sorting demands for scenes
        // with a large number of sprites
        prevCommand.data.push(sprElt);
    } else {
        $addGraphicsCommand({
            opcode:       'SPR',
            // Comparison z for detecting runs of sprites
            baseZ:         z_order,

            // Sorting Z
            z:             z_order,
            data: [sprElt]});
    }
}