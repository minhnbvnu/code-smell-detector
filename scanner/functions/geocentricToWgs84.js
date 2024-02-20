function geocentricToWgs84(p, datum_type, datum_params) {
        if (datum_type === values_1.PJD_3PARAM) {
            // if( x[io] === HUGE_VAL )
            //    continue;
            return {
                x: p.x + datum_params[0],
                y: p.y + datum_params[1],
                z: p.z + datum_params[2],
            };
        }
        else if (datum_type === values_1.PJD_7PARAM) {
            var Dx_BF = datum_params[0];
            var Dy_BF = datum_params[1];
            var Dz_BF = datum_params[2];
            var Rx_BF = datum_params[3];
            var Ry_BF = datum_params[4];
            var Rz_BF = datum_params[5];
            var M_BF = datum_params[6];
            // if( x[io] === HUGE_VAL )
            //    continue;
            return {
                x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
                y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
                z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
            };
        }
    }