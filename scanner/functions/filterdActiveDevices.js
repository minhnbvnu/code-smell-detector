function filterdActiveDevices(devices) {
        var activeDevices = [];
        for (var i=0; i<devices.length; i++) {
            if (devices[i].active) {
                activeDevices.push(devices[i]);
            }
        }
        return activeDevices;
    }