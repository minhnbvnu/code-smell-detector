function updateFogDistance(obj) {
        if (obj.material && fogDistance) {
            obj.material.fogDistance = fogDistance;
        }
    }