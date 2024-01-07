function calculateRhumbDestination(origin, distance, bearing, radius) {
    // φ => phi
    // λ => lambda
    // ψ => psi
    // Δ => Delta
    // δ => delta
    // θ => theta

    const delta = distance / radius; // angular distance in radians
    const lambda1 = origin.x * Math.PI / 180; // to radians, but without normalize to 𝜋
    const phi1 = toRadian(origin.y);
    const theta = toRadian(bearing);

    const DeltaPhi = delta * Math.cos(theta);
    let phi2 = phi1 + DeltaPhi;

    // check for some daft bugger going past the pole, normalise latitude if so
    if (Math.abs(phi2) > Math.PI / 2) phi2 = phi2 > 0 ? Math.PI - phi2 : -Math.PI - phi2;

    const DeltaPsi = Math.log(Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4));
    const q = Math.abs(DeltaPsi) > 10e-12 ? DeltaPhi / DeltaPsi : Math.cos(phi1); // E-W course becomes ill-conditioned with 0/0
    const DeltaLambda = delta * Math.sin(theta) / q;
    const lambda2 = lambda1 + DeltaLambda;

    origin.x = ((lambda2 * 180 / Math.PI) + 540) % 360 - 180;
    origin.y = phi2 * 180 / Math.PI;
    return origin; // normalise to −180..+180°
}