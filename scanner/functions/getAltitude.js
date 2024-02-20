function getAltitude(H, phi, dec) {
            return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
        }