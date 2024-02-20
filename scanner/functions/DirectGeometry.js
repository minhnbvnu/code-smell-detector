function DirectGeometry() {

  this.vertices = [];
  this.normals = [];
  this.colors = [];
  this.uvs = [];
  this.uvs2 = [];

  this.groups = [];

  this.morphTargets = {};

  this.skinWeights = [];
  this.skinIndices = [];

  // this.lineDistances = [];

  this.boundingBox = null;
  this.boundingSphere = null;

  // update flags

  this.verticesNeedUpdate = false;
  this.normalsNeedUpdate = false;
  this.colorsNeedUpdate = false;
  this.uvsNeedUpdate = false;
  this.groupsNeedUpdate = false;

}