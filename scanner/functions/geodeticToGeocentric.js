function geodeticToGeocentric(p, es, a) {
        var Longitude = p.x;
        var Latitude = p.y;
        var Height = p.z ? p.z : 0; //Z value not always supplied
        var Rn; /*  Earth radius at location  */
        var Sin_Lat; /*  Math.sin(Latitude)  */
        var Sin2_Lat; /*  Square of Math.sin(Latitude)  */
        var Cos_Lat; /*  Math.cos(Latitude)  */
        /*
         ** Don't blow up if Latitude is just a little out of the value
         ** range as it may just be a rounding issue.  Also removed longitude
         ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
         */
        if (Latitude < -values_1.HALF_PI && Latitude > -1.001 * values_1.HALF_PI) {
            Latitude = -values_1.HALF_PI;
        }
        else if (Latitude > values_1.HALF_PI && Latitude < 1.001 * values_1.HALF_PI) {
            Latitude = values_1.HALF_PI;
        }
        else if (Latitude < -values_1.HALF_PI) {
            /* Latitude out of range */
            //..reportError('geocent:lat out of range:' + Latitude);
            return { x: -Infinity, y: -Infinity, z: p.z };
        }
        else if (Latitude > values_1.HALF_PI) {
            /* Latitude out of range */
            return { x: Infinity, y: Infinity, z: p.z };
        }
        if (Longitude > Math.PI) {
            Longitude -= (2 * Math.PI);
        }
        Sin_Lat = Math.sin(Latitude);
        Cos_Lat = Math.cos(Latitude);
        Sin2_Lat = Sin_Lat * Sin_Lat;
        Rn = a / (Math.sqrt(1.0e0 - es * Sin2_Lat));
        return {
            x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
            y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
            z: ((Rn * (1 - es)) + Height) * Sin_Lat
        };
    }