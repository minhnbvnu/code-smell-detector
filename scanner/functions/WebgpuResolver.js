constructor(device) {
        this.device = device;

        // Shader that renders a fullscreen textured quad and copies the depth value from sample index 0
        // TODO: could handle all sample indices and use min/max as needed
        const code = `
 
            var<private> pos : array<vec2f, 4> = array<vec2f, 4>(
                vec2(-1.0, 1.0), vec2(1.0, 1.0), vec2(-1.0, -1.0), vec2(1.0, -1.0)
            );

            struct VertexOutput {
                @builtin(position) position : vec4f,
            };

            @vertex
            fn vertexMain(@builtin(vertex_index) vertexIndex : u32) -> VertexOutput {
              var output : VertexOutput;
              output.position = vec4f(pos[vertexIndex], 0, 1);
              return output;
            }

            @group(0) @binding(0) var img : texture_depth_multisampled_2d;

            @fragment
            fn fragmentMain(@builtin(position) fragColor: vec4f) -> @location(0) vec4f {
                // load th depth value from sample index 0
                var depth = textureLoad(img, vec2i(fragColor.xy), 0u);
                return vec4<f32>(depth, 0.0, 0.0, 0.0);
            }
        `;

        this.shader = new Shader(device, {
            name: 'WebGPUResolverDepthShader',
            shaderLanguage: SHADERLANGUAGE_WGSL,
            vshader: code,
            fshader: code
        });
    }