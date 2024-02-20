function refinementCommandCancellationFn(cmd) {
    if (!cmd.requester.parent || !cmd.requester.material) {
        return true;
    }
    // Cancel the command if the tile already has a better texture.
    // This is only needed for elevation layers, because we may have several
    // concurrent layers but we can only use one texture.
    if (cmd.layer.isElevationLayer && cmd.requester.material.getElevationLayer() &&
        cmd.targetLevel <= cmd.requester.material.getElevationLayer().level) {
        return true;
    }

    // Cancel the command if the layer was removed between command scheduling and command execution
    if (!cmd.requester.layerUpdateState[cmd.layer.id]
        || !cmd.layer.source._featuresCaches[cmd.layer.crs]) {
        return true;
    }

    return !cmd.requester.material.visible;
}