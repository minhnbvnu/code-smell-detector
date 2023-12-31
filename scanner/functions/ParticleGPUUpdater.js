constructor(emitter, gd) {
        this._emitter = emitter;

        this.frameRandomUniform = new Float32Array(3);
        this.emitterPosUniform = new Float32Array(3);
        this.emitterScaleUniform = new Float32Array([1, 1, 1]);
        this.worldBoundsMulUniform = new Float32Array(3);
        this.worldBoundsAddUniform = new Float32Array(3);
        this.inBoundsSizeUniform = new Float32Array(3);
        this.inBoundsCenterUniform = new Float32Array(3);

        this.constantParticleTexIN = gd.scope.resolve('particleTexIN');
        this.constantParticleTexOUT = gd.scope.resolve('particleTexOUT');
        this.constantEmitterPos = gd.scope.resolve('emitterPos');
        this.constantEmitterScale = gd.scope.resolve('emitterScale');
        this.constantSpawnBounds = gd.scope.resolve('spawnBounds');
        this.constantSpawnPosInnerRatio = gd.scope.resolve('spawnPosInnerRatio');
        this.constantSpawnBoundsSphere = gd.scope.resolve('spawnBoundsSphere');
        this.constantSpawnBoundsSphereInnerRatio = gd.scope.resolve('spawnBoundsSphereInnerRatio');
        this.constantInitialVelocity = gd.scope.resolve('initialVelocity');
        this.constantFrameRandom = gd.scope.resolve('frameRandom');
        this.constantDelta = gd.scope.resolve('delta');
        this.constantRate = gd.scope.resolve('rate');
        this.constantRateDiv = gd.scope.resolve('rateDiv');
        this.constantLifetime = gd.scope.resolve('lifetime');
        this.constantGraphSampleSize = gd.scope.resolve('graphSampleSize');
        this.constantGraphNumSamples = gd.scope.resolve('graphNumSamples');
        this.constantInternalTex0 = gd.scope.resolve('internalTex0');
        this.constantInternalTex1 = gd.scope.resolve('internalTex1');
        this.constantInternalTex2 = gd.scope.resolve('internalTex2');
        this.constantInternalTex3 = gd.scope.resolve('internalTex3');
        this.constantEmitterMatrix = gd.scope.resolve('emitterMatrix');
        this.constantEmitterMatrixInv = gd.scope.resolve('emitterMatrixInv');
        this.constantNumParticles = gd.scope.resolve('numParticles');
        this.constantNumParticlesPot = gd.scope.resolve('numParticlesPot');
        this.constantLocalVelocityDivMult = gd.scope.resolve('localVelocityDivMult');
        this.constantVelocityDivMult = gd.scope.resolve('velocityDivMult');
        this.constantRotSpeedDivMult = gd.scope.resolve('rotSpeedDivMult');
        this.constantSeed = gd.scope.resolve('seed');
        this.constantStartAngle = gd.scope.resolve('startAngle');
        this.constantStartAngle2 = gd.scope.resolve('startAngle2');
        this.constantOutBoundsMul = gd.scope.resolve('outBoundsMul');
        this.constantOutBoundsAdd = gd.scope.resolve('outBoundsAdd');
        this.constantInBoundsSize = gd.scope.resolve('inBoundsSize');
        this.constantInBoundsCenter = gd.scope.resolve('inBoundsCenter');
        this.constantMaxVel = gd.scope.resolve('maxVel');
        this.constantFaceTangent = gd.scope.resolve('faceTangent');
        this.constantFaceBinorm = gd.scope.resolve('faceBinorm');
    }