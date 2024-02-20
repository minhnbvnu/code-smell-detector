function getLayerIDFromOverrideName(instance, overrideName) {
    var loopOverridePoints = instance.overridePoints().objectEnumerator();
    var overridePoint;
    while (overridePoint = loopOverridePoints.nextObject()) {
        if (overridePoint.name().isEqualToString(overrideName)) {
            return overridePoint.layerID();
        }
    }
}