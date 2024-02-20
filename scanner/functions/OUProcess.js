function OUProcess(mu,A,tau){
  this.mu=mu;
  this.A=A;
  this.tau=Math.max(1e-10,tau);
  this.y=0;
}