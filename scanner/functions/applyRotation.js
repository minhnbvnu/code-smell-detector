function applyRotation(view, camera3D, state) {
    camera3D.quaternion.setFromUnitVectors(axisY, camera3D.up);

    camera3D.rotateY(state.rotateY);
    camera3D.rotateX(state.rotateX);

    view.notifyChange(view.camera3D);
}