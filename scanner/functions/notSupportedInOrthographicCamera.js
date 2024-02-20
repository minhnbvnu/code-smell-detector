function notSupportedInOrthographicCamera(camera, message) {
        if (isOrthographicCamera(camera)) {
            console.warn(message + " is not supported in OrthographicCamera");
            return true;
        }
        return false;
    }