function smartTravel(controls, camera) {
        cameraInitialPosition.copy(camera.position);
        if (camera.isOrthographicCamera) {
            cameraInitialZoom = camera.zoom;
        }
        controls.onMouseDown(event);
        controls.update(20, false);
    }