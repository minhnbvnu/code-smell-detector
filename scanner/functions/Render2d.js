constructor(device, maxQuads = 512) {
        const format = new VertexFormat(device, [
            { semantic: SEMANTIC_POSITION, components: 3, type: TYPE_FLOAT32 },
            { semantic: SEMANTIC_TEXCOORD0, components: 4, type: TYPE_FLOAT32 }
        ]);

        // generate quad indices
        const indices = new Uint16Array(maxQuads * 6);
        for (let i = 0; i < maxQuads; ++i) {
            indices[i * 6 + 0] = i * 4;
            indices[i * 6 + 1] = i * 4 + 1;
            indices[i * 6 + 2] = i * 4 + 2;
            indices[i * 6 + 3] = i * 4;
            indices[i * 6 + 4] = i * 4 + 2;
            indices[i * 6 + 5] = i * 4 + 3;
        }

        const shader = shaderChunks.createShaderFromCode(device, vertexShader, fragmentShader, 'mini-stats');

        this.device = device;
        this.buffer = new VertexBuffer(device, format, maxQuads * 4, BUFFER_STREAM);
        this.data = new Float32Array(this.buffer.numBytes / 4);
        this.indexBuffer = new IndexBuffer(device, INDEXFORMAT_UINT16, maxQuads * 6, BUFFER_STATIC, indices);
        this.prim = {
            type: PRIMITIVE_TRIANGLES,
            indexed: true,
            base: 0,
            count: 0
        };
        this.quads = 0;

        this.mesh = new Mesh(device);
        this.mesh.vertexBuffer = this.buffer;
        this.mesh.indexBuffer[0] = this.indexBuffer;
        this.mesh.primitive = [this.prim];

        const material = new Material();
        this.material = material;
        material.cull = CULLFACE_NONE;
        material.shader = shader;
        material.depthState = DepthState.NODEPTH;
        material.blendState = new BlendState(true, BLENDEQUATION_ADD, BLENDMODE_SRC_ALPHA, BLENDMODE_ONE_MINUS_SRC_ALPHA,
                                             BLENDEQUATION_ADD, BLENDMODE_ONE, BLENDMODE_ONE);
        material.update();

        this.meshInstance = new MeshInstance(this.mesh, material, new GraphNode('MiniStatsMesh'));

        this.uniforms = {
            clr: new Float32Array(4)
        };

        this.targetSize = {
            width: device.width,
            height: device.height
        };
    }