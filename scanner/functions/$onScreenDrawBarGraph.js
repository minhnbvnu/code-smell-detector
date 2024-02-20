function $onScreenDrawBarGraph(title, value, color, i) {
    const y1 = i * 14 + 1;
    $addGraphicsCommand({
        opcode: 'REC',
        z: 3099,
        baseZ: 3099,
        data: [{x1: 0, y1: y1, x2: $Math.min($Math.floor(SCREEN_SIZE.x * value / 18), SCREEN_SIZE.x - 1), y2: y1 + 12, fill: color, outline:0xF000}],
        clipX1:  0,
        clipY1:  0,
        clipX2:  SCREEN_SIZE.x - 1,
        clipY2:  SCREEN_SIZE.y - 1
    });
    
    $addGraphicsCommand({
        opcode:  'TXT',
        str:     title + ' ' + format_number(value, ' 0.0') + 'ms',
        fontIndex: $font8.$index[0],
        x:       1,
        y:       y1,
        z:       4000,
        color:   0xF000,
        outline: color,
        shadow:  0,
        height:  10,
        width:   100,
        clipX1:  0,
        clipY1:  0,
        clipX2:  SCREEN_SIZE.x - 1,
        clipY2:  SCREEN_SIZE.y - 1
    });
}