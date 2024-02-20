function rndNormal(){
  return Math.sqrt(-2 * Math.log(1 - Math.random()))
    * Math.cos(2 * Math.PI * Math.random());
}