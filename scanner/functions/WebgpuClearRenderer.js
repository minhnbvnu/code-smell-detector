constructor(device) {

        // shader that can write out color and depth values
        const code = `

            struct ub_mesh {
                color : vec4f,
                depth: f32
            }

            @group(0) @binding(0) var<uniform> ubMesh : ub_mesh;

            var<private> pos : array<vec2f, 4> = array<vec2f, 4>(
                vec2(-1.0, 1.0), vec2(1.0, 1.0),
                vec2(-1.0, -1.0), vec2(1.0, -1.0)
            );

            struct VertexOutput {
                @builtin(position) position : vec4f
            }

            @vertex
            fn vertexMain(@builtin(vertex_index) vertexIndex : u32) -> VertexOutput {
                var output : VertexOutput;
                output.position = vec4(pos[vertexIndex], ubMesh.depth, 1.0);
                return output;
            }

            @fragment
            fn fragmentMain() -> @location(0) vec4f {
                return ubMesh.color;
            }
        `;

        this.shader = new Shader(device, {
            name: 'WebGPUClearRendererShader',
            shaderLanguage: SHADERLANGUAGE_WGSL,
            vshader: code,
            fshader: code
        });

        // uniforms
        this.uniformBuffer = new UniformBuffer(device, new UniformBufferFormat(device, [
            new UniformFormat('color', UNIFORMTYPE_VEC4),
            new UniformFormat('depth', UNIFORMTYPE_FLOAT)
        ]), false);

        // format of the bind group
        const bindGroupFormat = new BindGroupFormat(device, [
            new BindBufferFormat(UNIFORM_BUFFER_DEFAULT_SLOT_NAME, SHADERSTAGE_VERTEX | SHADERSTAGE_FRAGMENT)
        ]);

        // bind group
        this.bindGroup = new BindGroup(device, bindGroupFormat, this.uniformBuffer);
        DebugHelper.setName(this.bindGroup, `ClearRenderer-BindGroup_${this.bindGroup.id}`);

        // uniform data
        this.colorData = new Float32Array(4);
        this.colorId = device.scope.resolve('color');
        this.depthId = device.scope.resolve('depth');
    }