constructor(app, component, data) {
        this.entity = component.entity;
        this.component = component;
        this.app = app;

        if (typeof Ammo !== 'undefined' && !_ammoVec1) {
            _ammoVec1 = new Ammo.btVector3();
            _ammoQuat = new Ammo.btQuaternion();
            _ammoTransform = new Ammo.btTransform();
        }

        this.initialize(data);
    }