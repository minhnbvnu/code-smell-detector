function updatePano(context, camera, layer) {
    const newPano = layer.mostNearPano(camera.position);
    // detection of oriented image change
    const currentId = layer.currentPano ? layer.currentPano.id : undefined;
    if (newPano && currentId != newPano.id) {
        layer.currentPano = newPano;

        // callback to indicate current pano has changed
        layer.onPanoChanged({
            previousPanoPosition: layer.getPreviousPano() ? layer.getPreviousPano().position : undefined,
            currentPanoPosition: layer.getCurrentPano().position,
            nextPanoPosition: layer.getNextPano().position,
        });
        // prepare informations about the needed textures
        const panoCameras = newPano.geometries[0].properties.idSensors;

        const imagesInfo = layer.cameras.map(cam => ({
            cameraId: cam.name,
            panoId: newPano.id,
            as: () => {},
        })).filter(info => !panoCameras || panoCameras.includes(info.cameraId));

        const command = {
            layer,
            // put informations about image URL as extent to be used by generic DataSourceProvider, OrientedImageSource will use that.
            extentsSource: imagesInfo,
            view: context.view,
            requester: newPano,
            earlyDropFunction: commandCancellation,
        };

        // async call to scheduler to get textures
        context.scheduler.execute(command)
            .then((textures) => {
                if (newPano.id === layer.currentPano.id) {
                    layer.material.setTextures(textures, newPano, layer.getCamerasNameFromFeature(newPano));
                    layer.material.updateUniforms(context.camera.camera3D);
                    context.view.notifyChange(layer, true);
                }
            }, () => {});
    }
}