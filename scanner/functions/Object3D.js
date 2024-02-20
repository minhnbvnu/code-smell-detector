function Object3D() {

  Object.defineProperty(this, 'id', { value: object3DId++ });

  this.uuid = _Math.generateUUID();

  this.name = '';
  this.type = 'Object3D';

  this.parent = null;
  this.children = [];

  this.up = Object3D.DefaultUp.clone();

  var position = new Vector3();
  var rotation = new Euler();
  var quaternion = new Quaternion();
  var scale = new Vector3(1, 1, 1);

  function onRotationChange() {

    quaternion.setFromEuler(rotation, false);

  }

  function onQuaternionChange() {

    rotation.setFromQuaternion(quaternion, undefined, false);

  }

  rotation.onChange(onRotationChange);
  quaternion.onChange(onQuaternionChange);

  Object.defineProperties(this, {
    position: {
      configurable: true,
      enumerable: true,
      value: position
    },
    rotation: {
      configurable: true,
      enumerable: true,
      value: rotation
    },
    quaternion: {
      configurable: true,
      enumerable: true,
      value: quaternion
    },
    scale: {
      configurable: true,
      enumerable: true,
      value: scale
    },
    modelViewMatrix: {
      value: new Matrix4()
    },
    normalMatrix: {
      value: new Matrix3()
    }
  });

  this.matrix = new Matrix4();
  this.matrixWorld = new Matrix4();

  this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
  this.matrixWorldNeedsUpdate = false;

  this.layers = new Layers();
  this.visible = true;

  this.castShadow = false;
  this.receiveShadow = false;

  this.frustumCulled = true;
  this.renderOrder = 0;

  this.userData = {};

}