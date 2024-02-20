function compareDatums(source, dest) {
        if (source.datum_type !== dest.datum_type) {
            return false; // false, datums are not equal
        }
        else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 0.000000000050) {
            // the tolerance for es is to ensure that GRS80 and WGS84
            // are considered identical
            return false;
        }
        else if (source.datum_type === values_1.PJD_3PARAM) {
            return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2]);
        }
        else if (source.datum_type === values_1.PJD_7PARAM) {
            return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6]);
        }
        else {
            return true; // datums are equal
        }
    }