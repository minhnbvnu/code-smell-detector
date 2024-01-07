constructor(device, sourceTexture) {
        super(device);
        this.sourceTexture = sourceTexture;

        this.shader = this.createQuadShader('TaaResolveShader', `

            uniform sampler2D sourceTexture;
            varying vec2 uv0;

            void main()
            {
                vec4 src = texture2D(sourceTexture, uv0);
                gl_FragColor = src;
            }`
        );

        this.sourceTextureId = device.scope.resolve('sourceTexture');

        this.blendState = new BlendState(true, BLENDEQUATION_ADD, BLENDMODE_CONSTANT, BLENDMODE_ONE_MINUS_CONSTANT);

        this.setup();
    }