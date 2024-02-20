function pickEllipsoid(camera) {
        raycaster.setFromCamera(center, camera);
        return ellipsoid.intersection(raycaster.ray);
    }