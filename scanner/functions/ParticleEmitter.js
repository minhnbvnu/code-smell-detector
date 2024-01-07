constructor(graphicsDevice, options) {
        this.graphicsDevice = graphicsDevice;
        const gd = graphicsDevice;
        const precision = 32;
        this.precision = precision;

        this._addTimeTime = 0;

        // Global system parameters
        setPropertyTarget = this;
        setPropertyOptions = options;
        setProperty('numParticles', 1);                          // Amount of particles allocated (max particles = max GL texture width at this moment)

        if (this.numParticles > graphicsDevice.maxTextureSize) {
            Debug.warn(`WARNING: can't create more than ${graphicsDevice.maxTextureSize} particles on this device.`);
            this.numParticles = graphicsDevice.maxTextureSize;
        }

        setProperty('rate', 1);                                  // Emission rate
        setProperty('rate2', this.rate);
        setProperty('lifetime', 50);                             // Particle lifetime
        setProperty('emitterExtents', new Vec3(0, 0, 0));        // Spawn point divergence
        setProperty('emitterExtentsInner', new Vec3(0, 0, 0));   // Volume inside emitterExtents to exclude from regeneration
        setProperty('emitterRadius', 0);
        setProperty('emitterRadiusInner', 0);                       // Same as ExtentsInner but for spherical volume
        setProperty('emitterShape', EMITTERSHAPE_BOX);
        setProperty('initialVelocity', 1);
        setProperty('wrap', false);
        setProperty('localSpace', false);
        setProperty('screenSpace', false);
        setProperty('wrapBounds', null);
        setProperty('colorMap', this.defaultParamTexture);
        setProperty('normalMap', null);
        setProperty('loop', true);
        setProperty('preWarm', false);
        setProperty('sort', PARTICLESORT_NONE); // Sorting mode: 0 = none, 1 = by distance, 2 = by life, 3 = by -life;  Forces CPU mode if not 0
        setProperty('mode', PARTICLEMODE_GPU);
        setProperty('scene', null);
        setProperty('lighting', false);
        setProperty('halfLambert', false);
        setProperty('intensity', 1.0);
        setProperty('stretch', 0.0);
        setProperty('alignToMotion', false);
        setProperty('depthSoftening', 0);
        setProperty('mesh', null);                              // Mesh to be used as particle. Vertex buffer is supposed to hold vertex position in first 3 floats of each vertex
                                                                // Leave undefined to use simple quads
        setProperty('particleNormal', new Vec3(0, 1, 0));
        setProperty('orientation', PARTICLEORIENTATION_SCREEN);

        setProperty('depthWrite', false);
        setProperty('noFog', false);
        setProperty('blendType', BLEND_NORMAL);
        setProperty('node', null);
        setProperty('startAngle', 0);
        setProperty('startAngle2', this.startAngle);

        setProperty('animTilesX', 1);
        setProperty('animTilesY', 1);
        setProperty('animStartFrame', 0);
        setProperty('animNumFrames', 1);
        setProperty('animNumAnimations', 1);
        setProperty('animIndex', 0);
        setProperty('randomizeAnimIndex', false);
        setProperty('animSpeed', 1);
        setProperty('animLoop', true);

        this._gpuUpdater = new ParticleGPUUpdater(this, gd);
        this._cpuUpdater = new ParticleCPUUpdater(this);

        this.emitterPosUniform = new Float32Array(3);
        this.wrapBoundsUniform = new Float32Array(3);
        this.emitterScaleUniform = new Float32Array([1, 1, 1]);

        // Time-dependent parameters
        setProperty('colorGraph', default1Curve3);
        setProperty('colorGraph2', this.colorGraph);

        setProperty('scaleGraph', default1Curve);
        setProperty('scaleGraph2', this.scaleGraph);

        setProperty('alphaGraph', default1Curve);
        setProperty('alphaGraph2', this.alphaGraph);

        setProperty('localVelocityGraph', default0Curve3);
        setProperty('localVelocityGraph2', this.localVelocityGraph);

        setProperty('velocityGraph', default0Curve3);
        setProperty('velocityGraph2', this.velocityGraph);

        setProperty('rotationSpeedGraph', default0Curve);
        setProperty('rotationSpeedGraph2', this.rotationSpeedGraph);

        setProperty('radialSpeedGraph', default0Curve);
        setProperty('radialSpeedGraph2', this.radialSpeedGraph);

        this.animTilesParams = new Float32Array(2);
        this.animParams = new Float32Array(4);
        this.animIndexParams = new Float32Array(2);

        this.internalTex0 = null;
        this.internalTex1 = null;
        this.internalTex2 = null;
        this.colorParam = null;

        this.vbToSort = null;
        this.vbOld = null;
        this.particleDistance = null;

        this.camera = null;

        this.swapTex = false;
        this.useMesh = true;
        this.useCpu = !graphicsDevice.supportsGpuParticles;

        this.pack8 = true;
        this.localBounds = new BoundingBox();
        this.worldBoundsNoTrail = new BoundingBox();
        this.worldBoundsTrail = [new BoundingBox(), new BoundingBox()];
        this.worldBounds = new BoundingBox();

        this.worldBoundsSize = new Vec3();

        this.prevWorldBoundsSize = new Vec3();
        this.prevWorldBoundsCenter = new Vec3();
        this.prevEmitterExtents = this.emitterExtents;
        this.prevEmitterRadius = this.emitterRadius;
        this.worldBoundsMul = new Vec3();
        this.worldBoundsAdd = new Vec3();
        this.timeToSwitchBounds = 0;
        // this.prevPos = new Vec3();

        this.shaderParticleUpdateRespawn = null;
        this.shaderParticleUpdateNoRespawn = null;
        this.shaderParticleUpdateOnStop = null;

        this.numParticleVerts = 0;
        this.numParticleIndices = 0;

        this.material = null;
        this.meshInstance = null;
        this.drawOrder = 0;

        this.seed = Math.random();

        this.fixedTimeStep = 1.0 / 60;
        this.maxSubSteps = 10;
        this.simTime = 0;
        this.simTimeTotal = 0;

        this.beenReset = false;

        this._layer = null;

        this.rebuild();
    }