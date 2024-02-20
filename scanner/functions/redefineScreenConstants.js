function redefineScreenConstants(environment, alreadySeen) {
    environment = environment || QRuntime;
    alreadySeen = alreadySeen || new Map();

    const VIEW_ARRAY = [];
    VIEW_ARRAY.$name = 'VIEW_ARRAY';
    
    if (PRIVATE_VIEW) {
        const VIEW_SIZE = {x: SCREEN_WIDTH >> 1, y: SCREEN_HEIGHT >> 1};
        for (let view_index = 0; view_index < 4; ++view_index) {
            VIEW_ARRAY.push({
                $name: 'VIEW_ARRAY[' + view_index + ']',
                corner: {
                    x: (view_index & 1)  ? VIEW_SIZE.x : 0,
                    y: (view_index >> 1) ? VIEW_SIZE.y : 0
                },
                size: VIEW_SIZE,
                shape: 'rect',
                angle: 0,
                scale: {x: 1, y: 1}
            });
        }
    } else {
        VIEW_ARRAY.push({
            $name: 'VIEW_ARRAY[0]',
            corner: {x: 0, y: 0},
            size: {x: SCREEN_WIDTH, y: SCREEN_HEIGHT},
            shape: 'rect',
            angle: 0,
            scale: {x: 1, y: 1}
        });
    }
    redefineConstant(environment, 'SCREEN_SIZE', {x: SCREEN_WIDTH, y: SCREEN_HEIGHT}, alreadySeen);
    redefineConstant(environment, 'VIEW_ARRAY', VIEW_ARRAY, alreadySeen);
}