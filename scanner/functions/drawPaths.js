function drawPaths(ctx, size, paths) {
        for (var i = 0; i < paths.length; ++i) {
            var path = paths[i];
            if (path.length < 2) {
                path = [path[0], [path[0][0] + 0.001, path[0][1] + 0.001]];
            }
            ctx.beginPath();
            ctx.moveTo(path[0][0] * size, path[0][1] * size);
            for (var j = 1; j < path.length; ++j) {
                ctx.lineTo(path[j][0] * size, path[j][1] * size);
            }
            ctx.stroke();
        }
    }