function OCurve( scale ) {

  THREE.Curve.call( this );

  this.scale = ( scale === undefined ) ? 5 : scale;

}