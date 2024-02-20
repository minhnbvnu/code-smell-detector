function constructPath(points, closed) {
    const segments = [];
    let d = {};
    let i = 0;
    points.forEach(pt => {
        if (i === 0) {
          d._in = pt;
        } else if (i === 1) {
          d._pt = pt;
        } else if (i === 2) {
          d._out = pt;
        }
        i += 1;
        if (i === 3) {
            segments.push(d);
            i = 0;
            d = {};
        }
    });
    const commands = [];
    let length = segments.length;
    if (closed) { length += 1; }
    for (i = 0; i < length; i += 1) {
        let seg = segments[i % segments.length];
        if (i === 0) {
            commands.push({ cmd: 'moveto', pt: seg._pt });
        } else {
            d = { cmd: 'curveto', pt: seg._pt, ctrl1: segments[i - 1]._out, ctrl2: seg._in };
            commands.push(d);
        }
    }
    const path = new Path();
    commands.forEach(el => {
        if (el.cmd === 'moveto') {
            path.moveTo(el.pt.x, el.pt.y);
        } else if (el.cmd === 'curveto') {
            path.curveTo(el.ctrl1.x, el.ctrl1.y, el.ctrl2.x, el.ctrl2.y, el.pt.x, el.pt.y);
        }
    });
    return path;
}