function CACC(v0, T, s0, a, b, delta, alpha) {
  this.QnoiseAccel = QnoiseAccel; // m^2/s^3
  this.driverfactor = 1; // if no transfer of driver individuality from master veh
  this.v0 = v0;
  this.T = T;
  this.s0 = s0;
  this.a = a;
  this.b = b;
  this.delta = delta;
  this.alpha = alpha;
  this.alpha_v0 = 1; // multiplicator for temporary reduction

  // possible restrictions (value 1000 => initially no restriction)
  this.speedlimit = 1000; // if effective speed limits, speedlimit<v0
  this.speedmax = 1000; // if engine restricts speed, speedmax<speedlimit, v0
  this.bmax = 18; // (2022) was=16
}