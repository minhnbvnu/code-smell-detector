function ACC(v0,T,s0,a,b){
  this.v0=v0; 
  this.T=T;
  this.s0=s0;
  this.a=a;
  this.b=b;

  this.cool=0.99;
  this.alpha_v0=1; // multiplicator for temporary reduction

  this.speedlimit=1000; // if effective speed limits, speedlimit<v0  
  this.speedmax=1000; // if vehicle restricts speed, speedmax<speedlimit, v0
  this.bmax=18;

  //console.log("in ACC cstr: this.v0=",this.v0);
}