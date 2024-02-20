function getEclipticLongitude(M, C) {
            const P = rad * 102.9372; // perihelion of the Earth
            return M + C + P + PI;
        }