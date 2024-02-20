function MeshLine() {

  this.positions = [];

  this.previous = [];
  this.next = [];
  this.side = [];
  this.width = [];
  this.indices_array = [];
  this.uvs = [];
  this.counters = [];
  this.geometry = new THREE.BufferGeometry();

  this.widthCallback = null;

}