function basisTranscode(device, url, data, callback, options) {
    basisInitialize();

    if (!deviceDetails) {
        deviceDetails = {
            webgl2: device.isWebGL2,
            formats: getCompressionFormats(device)
        };
    }

    queue.enqueueJob(url, data, callback, {
        deviceDetails: deviceDetails,
        isGGGR: !!options?.isGGGR,
        isKTX2: !!options?.isKTX2
    });

    return initializing;
}