function BloomEffect(graphicsDevice) {
    pc.PostEffect.call(this, graphicsDevice);

    // Shaders
    var attributes = {
        aPosition: pc.SEMANTIC_POSITION
    };

    // Pixel shader extracts the brighter areas of an image.
    // This is the first step in applying a bloom postprocess.
    var extractFrag = [
        "varying vec2 vUv0;",
        "",
        "uniform sampler2D uBaseTexture;",
        "uniform float uBloomThreshold;",
        "",
        "void main(void)",
        "{",
                // Look up the original image color.
        "    vec4 color = texture2D(uBaseTexture, vUv0);",
        "",
                // Adjust it to keep only values brighter than the specified threshold.
        "    gl_FragColor = clamp((color - uBloomThreshold) / (1.0 - uBloomThreshold), 0.0, 1.0);",
        "}"
    ].join("\n");

    // Pixel shader applies a one dimensional gaussian blur filter.
    // This is used twice by the bloom postprocess, first to
    // blur horizontally, and then again to blur vertically.
    var gaussianBlurFrag = [
        "#define SAMPLE_COUNT " + SAMPLE_COUNT,
        "",
        "varying vec2 vUv0;",
        "",
        "uniform sampler2D uBloomTexture;",
        "uniform vec2 uBlurOffsets[" + SAMPLE_COUNT + "];",
        "uniform float uBlurWeights[" + SAMPLE_COUNT + "];",
        "",
        "void main(void)",
        "{",
        "    vec4 color = vec4(0.0);",
                // Combine a number of weighted image filter taps.
        "    for (int i = 0; i < SAMPLE_COUNT; i++)",
        "    {",
        "        color += texture2D(uBloomTexture, vUv0 + uBlurOffsets[i]) * uBlurWeights[i];",
        "    }",
        "",
        "    gl_FragColor = color;",
        "}"
    ].join("\n");

    // Pixel shader combines the bloom image with the original
    // scene, using tweakable intensity levels.
    // This is the final step in applying a bloom postprocess.
    var combineFrag = [
        "varying vec2 vUv0;",
        "",
        "uniform float uBloomEffectIntensity;",
        "uniform sampler2D uBaseTexture;",
        "uniform sampler2D uBloomTexture;",
        "",
        "void main(void)",
        "{",
                // Look up the bloom and original base image colors.
        "    vec4 bloom = texture2D(uBloomTexture, vUv0) * uBloomEffectIntensity;",
        "    vec4 base = texture2D(uBaseTexture, vUv0);",
        "",
                // Darken down the base image in areas where there is a lot of bloom,
                // to prevent things looking excessively burned-out.
        "    base *= (1.0 - clamp(bloom, 0.0, 1.0));",
        "",
                // Combine the two images.
        "    gl_FragColor = base + bloom;",
        "}"
    ].join("\n");

    this.extractShader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, extractFrag, 'BloomExtractShader', attributes);
    this.blurShader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, gaussianBlurFrag, 'BloomBlurShader', attributes);
    this.combineShader = pc.createShaderFromCode(graphicsDevice, pc.PostEffect.quadVertexShader, combineFrag, 'BloomCombineShader', attributes);

    this.targets = [];

    // Effect defaults
    this.bloomThreshold = 0.25;
    this.blurAmount = 4;
    this.bloomIntensity = 1.25;

    // Uniforms
    this.sampleWeights = new Float32Array(SAMPLE_COUNT);
    this.sampleOffsets = new Float32Array(SAMPLE_COUNT * 2);
}