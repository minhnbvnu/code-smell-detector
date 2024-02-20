function PEMEncoder(entity) {
  DEREncoder.call(this, entity);
  this.enc = 'pem';
}