function $zoom(z) {
    return typeof $camera.zoom === 'number' ? $camera.zoom : $camera.zoom(z);
}