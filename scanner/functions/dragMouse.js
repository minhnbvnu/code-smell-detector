function dragMouse(controls, camera) {
        cameraInitialPosition.copy(camera.position);
        controls.onMouseDown(event);

        event.touches[0].clientX += 10;
        event.touches[0].pageX += 10;
        controls.onMouseMove(event);
        controls.update(20, false);
        controls.onMouseUp(event);
    }