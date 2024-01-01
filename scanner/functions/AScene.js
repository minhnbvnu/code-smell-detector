constructor () {
    var self;
    super();
    self = this;
    self.clock = new THREE.Clock();
    self.isIOS = isIOS;
    self.isMobile = isMobile;
    self.hasWebXR = isWebXRAvailable;
    self.isAR = false;
    self.isScene = true;
    self.object3D = new THREE.Scene();
    self.object3D.onAfterRender = function (renderer, scene, camera) {
      // THREE may swap the camera used for the rendering if in VR, so we pass it to tock
      if (self.isPlaying) { self.tock(self.time, self.delta, camera); }
    };
    self.resize = bind(self.resize, self);
    self.render = bind(self.render, self);
    self.systems = {};
    self.systemNames = [];
    self.time = self.delta = 0;
    self.usedOfferSession = false;

    self.behaviors = {tick: [], tock: []};
    self.hasLoaded = false;
    self.isPlaying = false;
    self.originalHTML = self.innerHTML;
  }