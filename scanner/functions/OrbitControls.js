function OrbitControls(camera, domElement) {
      this.camera = camera;
      this.touchEnd = bind(this.touchEnd, this);
      this.touchMove = bind(this.touchMove, this);
      this.touchStart = bind(this.touchStart, this);
      this.onKeyDown = bind(this.onKeyDown, this);
      this.onMouseWheel = bind(this.onMouseWheel, this);
      this.onMouseUp = bind(this.onMouseUp, this);
      this.onMouseMove = bind(this.onMouseMove, this);
      this.onMouseDown = bind(this.onMouseDown, this);
      this.reset = bind(this.reset, this);
      this.update = bind(this.update, this);
      this.pan = bind(this.pan, this);
      this.panUp = bind(this.panUp, this);
      this.panLeft = bind(this.panLeft, this);
      this.dollyOut = bind(this.dollyOut, this);
      this.dollyIn = bind(this.dollyIn, this);
      this.getZoomScale = bind(this.getZoomScale, this);
      this.rotateUp = bind(this.rotateUp, this);
      this.rotateLeft = bind(this.rotateLeft, this);
      this.getAutoRotationAngle = bind(this.getAutoRotationAngle, this);
      this.updateCamera = bind(this.updateCamera, this);
      this.enable = bind(this.enable, this);
      THREE.EventDispatcher.prototype.apply(this);
      this.domElement = domElement != null ? domElement : document;
      this.enabled = true;
      this.target = new THREE.Vector3();
      this.noZoom = false;
      this.zoomSpeed = 1.0;
      this.minDistance = 0;
      this.maxDistance = 2e308;
      this.noRotate = false;
      this.rotateSpeed = 1.0;
      this.noPan = false;
      this.keyPanSpeed = 7.0;
      this.autoRotate = false;
      this.autoRotateSpeed = 2.0;
      this.minPolarAngle = 0;
      this.maxPolarAngle = Math.PI;
      this.noKeys = true;
      this.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
      };
      this.clones = [];
      this.EPS = 0.000001;
      this.rotateStart = new THREE.Vector2();
      this.rotateEnd = new THREE.Vector2();
      this.rotateDelta = new THREE.Vector2();
      this.panStart = new THREE.Vector2();
      this.panEnd = new THREE.Vector2();
      this.panDelta = new THREE.Vector2();
      this.panOffset = new THREE.Vector3();
      this.panCurrent = new THREE.Vector3();
      this.offset = new THREE.Vector3();
      this.dollyStart = new THREE.Vector2();
      this.dollyEnd = new THREE.Vector2();
      this.dollyDelta = new THREE.Vector2();
      this.phiDelta = 0;
      this.thetaDelta = 0;
      this.scale = 1;
      this.lastPosition = new THREE.Vector3();
      this.STATE = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_DOLLY: 4,
        TOUCH_PAN: 5
      };
      this.state = this.STATE.NONE;
      this.target0 = this.target.clone();
      this.position0 = this.camera.position.clone();
      this.updateCamera();
      this.changeEvent = {
        type: 'change'
      };
      this.startEvent = {
        type: 'start'
      };
      this.endEvent = {
        type: 'end'
      };
      this.domElement.addEventListener('contextmenu', (function(event) {
        return event.preventDefault();
      }), false);
      this.domElement.addEventListener('mousedown', this.onMouseDown, false);
      this.domElement.addEventListener('mousewheel', this.onMouseWheel, false);
      this.domElement.addEventListener('touchstart', this.touchStart, false);
      window.addEventListener('keydown', this.onKeyDown, false);
      this.update();
    }