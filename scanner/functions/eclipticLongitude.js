function eclipticLongitude(M) {

    var C = rad*(1.9148*sin(M) + 0.02*sin(2*M) + 0.0003*sin(3*M)), // equation of center
      P = rad*102.9372; // perihelion of the Earth

    return M + C + P + PI;
  }