function fit(term) {
    var geometry = proposeGeometry(term);
    if (geometry) {
        if (term.rows !== geometry.rows || term.cols !== geometry.cols) {
            term.renderer.clear();
            term.resize(geometry.cols, geometry.rows);
        }
    }
}