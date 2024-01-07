constructor(splat, options) {
        this.splat = splat;

        // material
        const debugRender = options.debugRender;
        this.material = splat.createMaterial(options);

        // mesh
        const device = splat.device;
        if (debugRender) {
            this.mesh = createBox(device, {
                halfExtents: new Vec3(1.0, 1.0, 1.0)
            });
        } else {
            this.mesh = new Mesh(device);
            this.mesh.setPositions(new Float32Array([
                -1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1
            ]), 2);
            this.mesh.update();
        }

        this.mesh.aabb.copy(splat.aabb);

        // initialize index data
        const numSplats = splat.numSplats;
        let indexData;
        if (!device.isWebGL1) {
            indexData = new Uint32Array(numSplats);
            for (let i = 0; i < numSplats; ++i) {
                indexData[i] = i;
            }
        } else {
            indexData = new Float32Array(numSplats);
            for (let i = 0; i < numSplats; ++i) {
                indexData[i] = i + 0.2;
            }
        }

        const vb = new VertexBuffer(
            device,
            splat.vertexFormat,
            numSplats,
            BUFFER_DYNAMIC,
            indexData.buffer
        );
        this.vb = vb;

        this.meshInstance = new MeshInstance(this.mesh, this.material);
        this.meshInstance.setInstancing(vb, true);
        this.meshInstance.splatInstance = this;

        // clone centers to allow multiple instancing of sorter
        this.centers = new Float32Array(splat.centers);

        if (!options.dither) {
            this.sorter = new SplatSorter();
            this.sorter.init(this.vb, this.centers, !this.splat.device.isWebGL1);

            // if camera entity is provided, automatically use it to sort splats
            const cameraEntity = options.cameraEntity;
            if (cameraEntity) {
                this.callbackHandle = cameraEntity._app.on('prerender', () => {
                    this.sort(cameraEntity);
                });
            }
        }

        this.updateViewport();
    }