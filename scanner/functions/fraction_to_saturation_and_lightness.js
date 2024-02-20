function fraction_to_saturation_and_lightness(fraction) {
    const saturation_max = 90
    const saturation_min = 40
    const lightness_min = 50
    const lightness_max = 90
    return [(saturation_max-saturation_min)*fraction+saturation_min, (lightness_min-lightness_max)*fraction+lightness_max]
}