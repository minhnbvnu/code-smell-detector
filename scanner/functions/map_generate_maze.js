function map_generate_maze(args) {
    const map = args.map;
    if (!map || map.$type !== 'map') {
        $error('map_generate_maze() requires a map property on the argument');
    }

    const hallThickness = $Math.ceil({thickness: 1, ...(args.hall || {})}.thickness);
    const wallThickness = $Math.ceil({thickness: 1, ...(args.wall || {})}.thickness);
    const horizontal    = {border: 1, symmetric: false, loop: false, ...(args.horizontal || {})};
    const vertical      = {border: 1, symmetric: false, loop: false, ...(args.vertical   || {})};  
    
    const s = 2 / (hallThickness + wallThickness);
    const maze = $make_maze(
        $Math.ceil((map.size.x - horizontal.border * wallThickness + (horizontal.loop ? 0 : 1 + wallThickness)) * s),
        $Math.ceil((map.size.y -   vertical.border * wallThickness + (vertical.loop ? 0 : 1 + wallThickness)) * s),
        horizontal,
        vertical,
        args.straightness || 0,
        args.shortcuts || 0,
        (args.coverage === undefined) ? 1 : args.coverage,
        args.dead_end_array || [],
        hallThickness,
        wallThickness,
        args.random || random);

    // Resize the map
    const layer = args.layer || 0;
    map_resize(map, maze.length, maze[0].length);

    const hall_sprite = args.hall ? args.hall.sprite : undefined;
    const wall_sprite = args.wall ? args.wall.sprite : map.spritesheet[0][0];

    if (hall_sprite === undefined && wall_sprite === undefined) {
        $error('Either hall.sprite or wall.sprite must be defined for map_generate_maze()');
    }
    
    // Copy over the elements
    //let str = '';
    for (let y = 0; y < map.size.y; ++y) {
        for (let x = 0; x < map.size.x; ++x) {
            map.layer[layer][x][y] = maze[x][y] ? wall_sprite : hall_sprite;
            //str += maze[x][y] ? '*' : ' ';
        }
        //str += '\n';
    }
    //$console.log(str);
}