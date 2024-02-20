function geocentricFromWgs84(p, datum_type, datum_params) {
        if (datum_type === values_1.PJD_3PARAM) {
            //if( x[io] === HUGE_VAL )
            //    continue;
            return {
                x: p.x - datum_params[0],
                y: p.y - datum_params[1],
                z: p.z - datum_params[2],
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
            var x_tmp = (p.x - Dx_BF) / M_BF;
            var y_tmp = (p.y - Dy_BF) / M_BF;
            var z_tmp = (p.z - Dz_BF) / M_BF;
            //if( x[io] === HUGE_VAL )
            //    continue;
            return {
                x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
                y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
                z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
            };
        } //cs_geocentric_from_wgs84()
    }