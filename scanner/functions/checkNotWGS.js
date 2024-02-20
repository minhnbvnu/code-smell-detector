function checkNotWGS(source, dest) {
        return ((source.datum.datum_type === values_1.PJD_3PARAM || source.datum.datum_type === values_1.PJD_7PARAM || source.datum.datum_type === values_1.PJD_GRIDSHIFT) && dest.datumCode !== 'WGS84') ||
            ((dest.datum.datum_type === values_1.PJD_3PARAM || dest.datum.datum_type === values_1.PJD_7PARAM || dest.datum.datum_type === values_1.PJD_GRIDSHIFT) && source.datumCode !== 'WGS84');
    }