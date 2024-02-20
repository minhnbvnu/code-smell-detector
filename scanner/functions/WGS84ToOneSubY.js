function WGS84ToOneSubY(latitude) {
    return 1.0 - (0.5 - Math.log(Math.tan(PI_OV_FOUR + THREE.MathUtils.degToRad(latitude) * 0.5)) * INV_TWO_PI);
}