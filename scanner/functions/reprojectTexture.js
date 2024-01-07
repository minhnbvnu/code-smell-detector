function reprojectTexture(source, target, options = {}) {
    // maintain backwards compatibility with previous function signature
    // reprojectTexture(device, source, target, specularPower = 1, numSamples = 1024)
    if (source instanceof GraphicsDevice) {
        source = arguments[1];
        target = arguments[2];
        options = { };
        if (arguments[3] !== undefined) {
            options.specularPower = arguments[3];
        }
        if (arguments[4] !== undefined) {
            options.numSamples = arguments[4];
        }

        Debug.deprecated('please use the updated pc.reprojectTexture API.');
    }

    // calculate inner width and height
    const seamPixels = options.seamPixels ?? 0;
    const innerWidth = (options.rect?.z ?? target.width) - seamPixels * 2;
    const innerHeight = (options.rect?.w ?? target.height) - seamPixels * 2;
    if (innerWidth < 1 || innerHeight < 1) {
        // early out if inner space is empty
        return false;
    }

    // table of distribution -> function name
    const funcNames = {
        'none': 'reproject',
        'lambert': 'prefilterSamplesUnweighted',
        'phong': 'prefilterSamplesUnweighted',
        'ggx': 'prefilterSamples'
    };

    // extract options
    const specularPower = options.hasOwnProperty('specularPower') ? options.specularPower : 1;
    const face = options.hasOwnProperty('face') ? options.face : null;
    const distribution = options.hasOwnProperty('distribution') ? options.distribution : (specularPower === 1) ? 'none' : 'phong';

    const processFunc = funcNames[distribution] || 'reproject';
    const prefilterSamples = processFunc.startsWith('prefilterSamples');
    const decodeFunc = ChunkUtils.decodeFunc(source.encoding);
    const encodeFunc = ChunkUtils.encodeFunc(target.encoding);
    const sourceFunc = `sample${getProjectionName(source.projection)}`;
    const targetFunc = `getDirection${getProjectionName(target.projection)}`;
    const numSamples = options.hasOwnProperty('numSamples') ? options.numSamples : 1024;

    // generate unique shader key
    const shaderKey = `${processFunc}_${decodeFunc}_${encodeFunc}_${sourceFunc}_${targetFunc}_${numSamples}`;

    const device = source.device;

    let shader = getProgramLibrary(device).getCachedShader(shaderKey);
    if (!shader) {
        const defines =
            `#define PROCESS_FUNC ${processFunc}\n` +
            (prefilterSamples ? `#define USE_SAMPLES_TEX\n` : '') +
            (source.cubemap ? `#define CUBEMAP_SOURCE\n` : '') +
            `#define DECODE_FUNC ${decodeFunc}\n` +
            `#define ENCODE_FUNC ${encodeFunc}\n` +
            `#define SOURCE_FUNC ${sourceFunc}\n` +
            `#define TARGET_FUNC ${targetFunc}\n` +
            `#define NUM_SAMPLES ${numSamples}\n` +
            `#define NUM_SAMPLES_SQRT ${Math.round(Math.sqrt(numSamples)).toFixed(1)}\n`;

        shader = createShaderFromCode(
            device,
            vsCode,
            `${defines}\n${shaderChunks.reprojectPS}`,
            shaderKey
        );
    }

    DebugGraphics.pushGpuMarker(device, "ReprojectTexture");

    // render state
    // TODO: set up other render state here to expected state
    device.setBlendState(BlendState.NOBLEND);

    const constantSource = device.scope.resolve(source.cubemap ? "sourceCube" : "sourceTex");
    Debug.assert(constantSource);
    constantSource.setValue(source);

    const constantParams = device.scope.resolve("params");
    const constantParams2 = device.scope.resolve("params2");

    const uvModParam = device.scope.resolve("uvMod");
    if (seamPixels > 0) {
        uvModParam.setValue([
            (innerWidth + seamPixels * 2) / innerWidth,
            (innerHeight + seamPixels * 2) / innerHeight,
            -seamPixels / innerWidth,
            -seamPixels / innerHeight
        ]);
    } else {
        uvModParam.setValue([1, 1, 0, 0]);
    }

    const params = [
        0,
        specularPower,
        source.fixCubemapSeams ? 1.0 / source.width : 0.0,          // source seam scale
        target.fixCubemapSeams ? 1.0 / target.width : 0.0           // target seam scale
    ];

    const params2 = [
        target.width * target.height * (target.cubemap ? 6 : 1),
        source.width * source.height * (source.cubemap ? 6 : 1)
    ];

    if (prefilterSamples) {
        // set or generate the pre-calculated samples data
        const sourceTotalPixels = source.width * source.height * (source.cubemap ? 6 : 1);
        const samplesTex =
            (distribution === 'ggx') ? generateGGXSamplesTex(device, numSamples, specularPower, sourceTotalPixels) :
                ((distribution === 'lambert') ? generateLambertSamplesTex(device, numSamples, sourceTotalPixels) :
                    generatePhongSamplesTex(device, numSamples, specularPower));
        device.scope.resolve("samplesTex").setValue(samplesTex);
        device.scope.resolve("samplesTexInverseSize").setValue([1.0 / samplesTex.width, 1.0 / samplesTex.height]);
    }

    for (let f = 0; f < (target.cubemap ? 6 : 1); f++) {
        if (face === null || f === face) {
            const renderTarget = new RenderTarget({
                colorBuffer: target,
                face: f,
                depth: false,
                flipY: device.isWebGPU
            });
            params[0] = f;
            constantParams.setValue(params);
            constantParams2.setValue(params2);

            drawQuadWithShader(device, renderTarget, shader, options?.rect);

            renderTarget.destroy();
        }
    }

    DebugGraphics.popGpuMarker(device);

    return true;
}