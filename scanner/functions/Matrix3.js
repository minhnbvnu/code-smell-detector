function Matrix3() {

  this.elements = [

    1, 0, 0,
    0, 1, 0,
    0, 0, 1

  ];

  if (arguments.length > 0) {

    console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.');

  }

}