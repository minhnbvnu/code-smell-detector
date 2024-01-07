function applyRadialDeadZone(pos, remappedPos, deadZoneLow, deadZoneHigh) {
    var magnitude = pos.length();

    if (magnitude > deadZoneLow) {
        var legalRange = 1 - deadZoneHigh - deadZoneLow;
        var normalizedMag = Math.min(1, (magnitude - deadZoneLow) / legalRange);
        var scale = normalizedMag / magnitude;
        remappedPos.copy(pos).mulScalar(scale);
    } else {
        remappedPos.set(0, 0);
    }
}