function plotFn(fn, xMin, xMax, canvasId)
{
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");

    var numPts = canvas.width;

    var xs = [];
    var ys = [];

    for (var i = 0; i < numPts; ++i)
    {
        var x = xMin + (i / (numPts - 1)) * (xMax - xMin);
        var y = fn(x);
        xs.push(x);
        ys.push(y);
    }

    var yMin = Math.min(...ys);
    var yMax = Math.max(...ys);

    console.log(yMin);
    console.log(yMax);

    ctx.strokeStyle="#FF0000";

    for (var i = 0; i < ys.length; ++i)
    {
        var x = xs[i];
        var y = ys[i];
        var relX = (x - xMin) / (xMax - xMin);
        var relY = (y - yMin) / (yMax - yMin);
        var cX = canvas.width * relX;
        var cY = canvas.height * (1 - relY);

        if (i < 80)
            console.log('i=', i, 'y=', y, 'cY=', cY);

        if (i == 0)
        {
            ctx.moveTo(cX, cY);
        }
        else
        {
            ctx.lineTo(cX, cY);
            ctx.stroke();
        }
    }
}