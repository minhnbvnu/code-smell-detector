function tileLayer(view) {
    return view.getLayers(l => l.isTiledGeometryLayer)[0];
}