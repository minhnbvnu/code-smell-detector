function PEMDecoder(entity) {
  DERDecoder.call(this, entity);
  this.enc = 'pem';
}