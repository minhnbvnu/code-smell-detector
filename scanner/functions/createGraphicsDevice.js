function createGraphicsDevice(canvas, options = {}) {

    const deviceTypes = options.deviceTypes ?? [];

    // automatically added fallbacks
    if (!deviceTypes.includes(DEVICETYPE_WEBGL2)) {
        deviceTypes.push(DEVICETYPE_WEBGL2);
    }
    if (!deviceTypes.includes(DEVICETYPE_WEBGL1)) {
        deviceTypes.push(DEVICETYPE_WEBGL1);
    }
    if (!deviceTypes.includes(DEVICETYPE_NULL)) {
        deviceTypes.push(DEVICETYPE_NULL);
    }

    // XR compatibility if not specified
    if (platform.browser && !!navigator.xr) {
        options.xrCompatible ??= true;
    }

    // make a list of device creation functions in priority order
    const deviceCreateFuncs = [];
    for (let i = 0; i < deviceTypes.length; i++) {
        const deviceType = deviceTypes[i];

        if (deviceType === DEVICETYPE_WEBGPU && window?.navigator?.gpu) {
            deviceCreateFuncs.push(() => {
                const device = new WebgpuGraphicsDevice(canvas, options);
                return device.initWebGpu(options.glslangUrl, options.twgslUrl);
            });
        }

        if (deviceType === DEVICETYPE_WEBGL1 || deviceType === DEVICETYPE_WEBGL2) {
            deviceCreateFuncs.push(() => {
                options.preferWebGl2 = deviceType === DEVICETYPE_WEBGL2;
                return new WebglGraphicsDevice(canvas, options);
            });
        }

        if (deviceType === DEVICETYPE_NULL) {
            deviceCreateFuncs.push(() => {
                return new NullGraphicsDevice(canvas, options);
            });
        }
    }

    // execute each device creation function returning the first successful result
    return new Promise((resolve, reject) => {
        let attempt = 0;
        const next = () => {
            if (attempt >= deviceCreateFuncs.length) {
                reject(new Error('Failed to create a graphics device'));
            } else {
                Promise.resolve(deviceCreateFuncs[attempt++]())
                    .then((device) => {
                        if (device) {
                            resolve(device);
                        } else {
                            next();
                        }
                    }).catch((err) => {
                        console.log(err);
                        next();
                    });
            }
        };
        next();
    });
}