function get_drawing_params() {
    const SVG_ROOT = document.getElementById("treemap_root_svg")
    const vw = Math.max(SVG_ROOT.clientWidth || 0, SVG_ROOT.innerWidth || 0)
    const vh = Math.max(SVG_ROOT.clientHeight || 0, SVG_ROOT.innerHeight || 0)
    const aspect_ratio = vw/vh
    const x = 0
    const y = 0
    return [SVG_ROOT, x, y, aspect_ratio]
}