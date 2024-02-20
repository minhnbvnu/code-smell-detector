function Geometry() {

  Object.defineProperty(this, 'id', { value: geometryId += 2 });

  this.uuid = _Math.generateUUID();

  this.name = '';
  this.type = 'Geometry';

  this.vertices = [];
  this.colors = [];
  this.faces = [];
  this.faceVertexUvs = [
    []
  ];

  this.morphTargets = [];
  this.morphNormals = [];

  this.skinWeights = [];
  this.skinIndices = [];

  this.lineDistances = [];

  this.boundingBox = null;
  this.boundingSphere = null;

  // update flags

  this.elementsNeedUpdate = false;
  this.verticesNeedUpdate = false;
  this.uvsNeedUpdate = false;
  this.normalsNeedUpdate = false;
  this.colorsNeedUpdate = false;
  this.lineDistancesNeedUpdate = false;
  this.groupsNeedUpdate = false;

}