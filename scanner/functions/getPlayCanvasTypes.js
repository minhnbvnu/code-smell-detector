function getPlayCanvasTypes() {
    const i = href.indexOf("/examples/");
    if (i === -1) { // npm run serve
        return '/playcanvas.d.ts';
    }
    return href.substring(0, i) + "/build/playcanvas.d.ts";
}