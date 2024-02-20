function proxyProperty(view, camera, rig, key) {
    rig.proxy.position[key] = camera.position[key];
    Object.defineProperty(camera.position, key, {
        get: () => rig.proxy.position[key],
        set: (newValue) => {
            rig.removeProxy(view, camera);
            camera.position[key] = newValue;
        },
    });
}