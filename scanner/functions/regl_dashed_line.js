function regl_dashed_line(regl, line_geometry, line_triangles) {
        const config = {
            vert: `\
#define DASHED
${regl_line_vert_1.default}
`,
            frag: `\
#define DASHED
${regl_line_frag_1.default}
`,
            attributes: {
                a_position: {
                    buffer: line_geometry,
                    divisor: 0,
                },
                a_point_prev(_, props) {
                    return props.points.to_attribute_config();
                },
                a_point_start(_, props) {
                    return props.points.to_attribute_config(Float32Array.BYTES_PER_ELEMENT * 2);
                },
                a_point_end(_, props) {
                    return props.points.to_attribute_config(Float32Array.BYTES_PER_ELEMENT * 4);
                },
                a_point_next(_, props) {
                    return props.points.to_attribute_config(Float32Array.BYTES_PER_ELEMENT * 6);
                },
                a_show_prev(_, props) {
                    return props.show.to_attribute_config();
                },
                a_show_curr(_, props) {
                    return props.show.to_attribute_config(Uint8Array.BYTES_PER_ELEMENT);
                },
                a_show_next(_, props) {
                    return props.show.to_attribute_config(Uint8Array.BYTES_PER_ELEMENT * 2);
                },
                a_length_so_far(_, props) {
                    return props.length_so_far.to_attribute_config();
                },
            },
            uniforms: {
                u_canvas_size: regl.prop("canvas_size"),
                u_pixel_ratio: regl.prop("pixel_ratio"),
                u_antialias: regl.prop("antialias"),
                u_line_color: regl.prop("line_color"),
                u_linewidth: regl.prop("linewidth"),
                u_miter_limit: regl.prop("miter_limit"),
                u_line_join: regl.prop("line_join"),
                u_line_cap: regl.prop("line_cap"),
                u_dash_tex: regl.prop("dash_tex"),
                u_dash_tex_info: regl.prop("dash_tex_info"),
                u_dash_scale: regl.prop("dash_scale"),
                u_dash_offset: regl.prop("dash_offset"),
            },
            elements: line_triangles,
            instances: regl.prop("nsegments"),
            blend: {
                enable: true,
                equation: "max",
                func: {
                    srcRGB: 1,
                    srcAlpha: 1,
                    dstRGB: 1,
                    dstAlpha: 1,
                },
            },
            depth: { enable: false },
            scissor: {
                enable: true,
                box: regl.prop("scissor"),
            },
            viewport: regl.prop("viewport"),
        };
        return regl(config);
    }