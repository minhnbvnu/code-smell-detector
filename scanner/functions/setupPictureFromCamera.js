function setupPictureFromCamera(camera, imageUrl, opacity, distance) {
    // create a textured plane, representing the picture.
    const plane = createTexturedPlane(imageUrl, opacity);
    camera.add(plane);

    transformTexturedPlane(camera, distance, plane);

    return plane;
}