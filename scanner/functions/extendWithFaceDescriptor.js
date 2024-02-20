function extendWithFaceDescriptor(sourceObj, descriptor) {
        var extension = { descriptor: descriptor };
        return Object.assign({}, sourceObj, extension);
    }