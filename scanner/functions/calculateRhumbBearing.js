function calculateRhumbBearing(from, to) {
    // φ => phi
    // Δλ => deltaLambda
    // Δψ => deltaPsi
    // θ => theta
    const phi1 = toRadian(from.y);
    const phi2 = toRadian(to.y);
    let deltaLambda = toRadian((to.x - from.x));
    // if deltaLambdaon over 180° take shorter rhumb line across the anti-meridian:
    if (deltaLambda > Math.PI) deltaLambda -= 2 * Math.PI;
    if (deltaLambda < -Math.PI) deltaLambda += 2 * Math.PI;

    const deltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));

    const theta = Math.atan2(deltaLambda, deltaPsi);

    return (toDegree(theta) + 360) % 360;
}