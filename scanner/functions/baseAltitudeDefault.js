function baseAltitudeDefault(properties, ctx) {
    return ctx?.coordinates?.z || ctx?.collection?.center?.z || 0;
}