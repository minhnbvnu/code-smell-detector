function e_inv(xy, lp) {
    var sin_Cn, cos_Cn, cos_Ce, sin_Ce, tmp;
    var Cn = xy.y, Ce = xy.x;
    /* normalize N, E */
    Cn = (Cn - Zb)/Qn;
    Ce = Ce/Qn;
    if (fabs(Ce) <= 2.623395162778) { /* 150 degrees */
      /* norm. N, E -> compl. sph. LAT, LNG */
      tmp = clenS(utg, 2*Cn, 2*Ce);
      Cn += tmp[0];
      Ce += tmp[1];
      Ce = atan(sinh(Ce)); /* Replaces: Ce = 2*(atan(exp(Ce)) - M_FORTPI); */
      /* compl. sph. LAT -> Gaussian LAT, LNG */
      sin_Cn = sin(Cn);
      cos_Cn = cos(Cn);
      sin_Ce = sin(Ce);
      cos_Ce = cos(Ce);
      Ce = atan2(sin_Ce, cos_Ce*cos_Cn);
      Cn = atan2(sin_Cn*cos_Ce, hypot(sin_Ce, cos_Ce*cos_Cn));
      /* Gaussian LAT, LNG -> ell. LAT, LNG */
      lp.phi = gatg (cgb, Cn);
      lp.lam = Ce;
    }
    else {
      lp.phi = lp.lam = HUGE_VAL;
    }
  }