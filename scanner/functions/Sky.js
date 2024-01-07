constructor(scene) {
        this.device = scene.device;
        this.scene = scene;

        // defaults
        this.center = new Vec3(0, 1, 0);

        this.centerArray = new Float32Array(3);
        this.projectedSkydomeCenterId = this.device.scope.resolve('projectedSkydomeCenter');
    }