function wheelMouse(controls, camera, wheelDelta) {
        cameraInitialPosition.copy(camera.position);
        if (camera.isOrthographicCamera) {
            cameraInitialZoom = camera.zoom;
        }

        event.deltaY = wheelDelta;
        controls.onMouseWheel(event);
        controls.update(20, false);
    }