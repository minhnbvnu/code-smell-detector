function draw_entity(e, recurse) {
    if (e === undefined) { $error("nil entity in draw_entity()"); }
    if (recurse === undefined) { recurse = true; }

    if ($showEntityBoundsEnabled) {
        draw_bounds(e, false);
    }
    
    if (e.sprite) {
        // Shift the transform temporarily to support the offset without
        // memory allocation
        const oldX = $offsetX, oldY = $offsetY;
        $offsetX += e.offset.x * $scaleX; $offsetY += e.offset.y * $scaleY;
        draw_sprite(e.sprite, e.pos, e.angle, e.scale, e.opacity, e.z, e.override_color, undefined, e.pivot);
        $offsetX = oldX; $offsetY = oldY;
    }

    if (e.child_array && recurse) {
        const N = e.child_array.length;
        for (let i = 0; i < N; ++i) {
            draw_entity(e.child_array[i], recurse);
        }
    }

    if (e.font && e.text) {
        const oldX = $offsetX, oldY = $offsetY;
        $offsetX += (e.offset.x + (e.text_offset ? e.text_offset.x : 0)) * $scaleX; $offsetY += (e.offset.y + (e.text_offset ? e.text_offset.y : 0)) * $scaleY;
        draw_text(e.font, e.text, e.pos, e.text_color || rgb(1, 1, 1), e.text_shadow, e.text_outline, e.text_x_align, e.text_y_align, e.z);
        $offsetX = oldX; $offsetY = oldY;
    }
}