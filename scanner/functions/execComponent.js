function execComponent(glyph, state, xScale, yScale)
{
    var points = glyph.points || [];
    var pLen = points.length;
    var gZone = state.gZone = state.z0 = state.z1 = state.z2 = [];
    var contours = state.contours = [];
    var i;

    // Scales the original points and
    // makes copies for the hinted points.
    var cp; // current point
    for (i = 0; i < pLen; i++) {
        cp = points[i];

        gZone[i] = new HPoint(
            cp.x * xScale,
            cp.y * yScale,
            cp.lastPointOfContour,
            cp.onCurve
        );
    }

    // Chain links the contours.
    var sp; // start point
    var np; // next point

    for (i = 0; i < pLen; i++) {
        cp = gZone[i];

        if (!sp) {
            sp = cp;
            contours.push(i);
        }

        if (cp.lastPointOfContour) {
            cp.nextPointOnContour = sp;
            sp.prevPointOnContour = cp;
            sp = undefined;
        } else {
            np = gZone[i + 1];
            cp.nextPointOnContour = np;
            np.prevPointOnContour = cp;
        }
    }

    if (state.inhibitGridFit) return;

    gZone.push(
        new HPoint(0, 0),
        new HPoint(Math.round(glyph.advanceWidth * xScale), 0)
    );

    exec(state);

    // Removes the extra points.
    gZone.length -= 2;

    if (DEBUG) {
        console.log('FINISHED GLYPH', state.stack);
        for (i = 0; i < pLen; i++) {
            console.log(i, gZone[i].x, gZone[i].y);
        }
    }
}