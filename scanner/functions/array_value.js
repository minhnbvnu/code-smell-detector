function array_value(animation, frame, extrapolate) {
    if (! Array.isArray(animation) && (typeof animation !== 'string')) {
        if (animation === undefined || animation === null) {
            $error('Passed nil to array_value()');
        } else {
            $error('The first argument to array_value() must be an array or string (was ' + unparse(animation) + ')');
        }
    }
    
    frame = $Math.floor(frame);
    switch (extrapolate || animation.extrapolate || 'clamp') {
    case 'oscillate':
        frame = oscillate(frame, animation.length - 1);
        break;
    
    case 'loop':
        frame = loop(frame, animation.length);
        break;
        
    default:
        frame = $clamp(frame, 0, animation.length - 1)
    }
      
    return animation[frame];
}