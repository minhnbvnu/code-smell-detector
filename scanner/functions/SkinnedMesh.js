function SkinnedMesh(geometry, material) {

  Mesh.call(this, geometry, material);

  this.type = 'SkinnedMesh';

  this.bindMode = 'attached';
  this.bindMatrix = new Matrix4();
  this.bindMatrixInverse = new Matrix4();

  var bones = this.initBones();
  var skeleton = new Skeleton(bones);

  this.bind(skeleton, this.matrixWorld);

  this.normalizeSkinWeights();

}