function set_post_effects(args) {
    if (args.color !== undefined) {
        $postFX.color.r = (args.color.r !== undefined) ? args.color.r : 0;
        $postFX.color.g = (args.color.g !== undefined) ? args.color.g : 0;
        $postFX.color.b = (args.color.b !== undefined) ? args.color.b : 0;
        $postFX.color.a = (args.color.a !== undefined) ? args.color.a : 1;
    }

    switch (args.color_blend) {
    case undefined: break;
    case 'source-over':
    case 'hue':
    case 'multiply':
    case 'difference':
        $postFX.color_blend = args.color_blend;
        break;
    default: $error('Illegal color_blend for post effects: "' + args.color_blend + '"');
    }

    if (args.scale !== undefined) {
        if (typeof args.scale === 'number') {
            $postFX.scale.x = $postFX.scale.y = args.scale;
        } else {
            $postFX.scale.x = (args.scale.x !== undefined) ? args.scale.x : 1;
            $postFX.scale.y = (args.scale.y !== undefined) ? args.scale.y : 1;
        }
    }

    if (args.angle !== undefined) {
        $postFX.angle = args.angle;
    }

    if (args.pos !== undefined) {
        $postFX.pos.x = (args.pos.x !== undefined) ? args.pos.x : SCREEN_WIDTH / 2;
        $postFX.pos.y = (args.pos.y !== undefined) ? args.pos.y : SCREEN_HEIGHT / 2;
    }
    
    if (args.motion_blur !== undefined) {
        $postFX.motion_blur = clamp(args.motion_blur, 0, 1);
    }

    if (args.afterglow !== undefined) {
        $postFX.afterglow.r = (args.afterglow.r !== undefined) ? args.afterglow.r : 0;
        $postFX.afterglow.g = (args.afterglow.g !== undefined) ? args.afterglow.g : 0;
        $postFX.afterglow.b = (args.afterglow.b !== undefined) ? args.afterglow.b : 0;
    }

    if (args.bloom !== undefined) {
        $postFX.bloom = clamp(args.bloom, 0, 1);
    }

    if (gamepad_array && (gamepad_array[0].status === 'host')) {
        $notifyGuestsOfPostEffects();
    }
}