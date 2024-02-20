function MockElement() {
  this.appendChild = function(a) {};
  this.createComment = function(a) {};
  this.createDocumentFragment = function() { return new MockElement(); };
  this.createElement = function(a) { return new MockElement(); };
  this.documentElement = this;
  this.getElementById = function(a) { return 0; };
  this.getElementsByTagName = function(a) {return [0];};
  this.insertBefore = function(a, b) {};
  this.removeChild = function(a) {};
  this.setAttribute = function(a, b) {};
}