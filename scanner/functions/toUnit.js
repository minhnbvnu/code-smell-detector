function toUnit(crs) {
    mustBeString(crs);
    switch (crs) {
        case 'EPSG:4326' : return UNIT.DEGREE;
        case 'EPSG:4978' : return UNIT.METER;
        default: {
            const p = proj4.defs(formatToEPSG(crs));
            if (!p) {
                return undefined;
            }
            return _unitFromProj4Unit(p.units);
        }
    }
}