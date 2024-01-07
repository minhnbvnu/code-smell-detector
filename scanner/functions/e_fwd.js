function e_fwd(lp, xy) {
    var sin_Cn, cos_Cn, cos_Ce, sin_Ce, tmp;
    var Cn = lp.phi, Ce = lp.lam;

    /* ell. LAT, LNG -> Gaussian LAT, LNG */
    Cn = gatg(cbg, Cn);
    /* Gaussian LAT, LNG -> compl. sph. LAT */
    sin_Cn = sin(Cn);
    cos_Cn = cos(Cn);
    sin_Ce = sin(Ce);
    cos_Ce = cos(Ce);
    Cn = atan2(sin_Cn, cos_Ce*cos_Cn);
    Ce = atan2(sin_Ce*cos_Cn, hypot(sin_Cn, cos_Cn*cos_Ce));
    /* compl. sph. N, E -> ell. norm. N, E */
    Ce = asinhy(tan(Ce));
    tmp = clenS(gtu, 2*Cn, 2*Ce);
    Cn += tmp[0];
    Ce += tmp[1];
    if (fabs (Ce) <= 2.623395162778) {
        xy.y  = Qn * Cn + Zb;  /* Northing */
        xy.x  = Qn * Ce;       /* Easting  */
    } else {
      xy.x = xy.y = HUGE_VAL;
    }
  }