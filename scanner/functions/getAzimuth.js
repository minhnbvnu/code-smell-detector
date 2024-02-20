function getAzimuth(H, phi, dec) {
            return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
        }