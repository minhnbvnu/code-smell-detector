function regl_marker(regl, marker_type, vert_defs = [], frag_defs = [], attributes) {
        const vert_prefix = vert_defs.map((def) => `#define ${def}`).join("\n");
        const frag_prefix = frag_defs.map((def) => `#define ${def}`).join("\n");
        const config = {
            vert: `\
${vert_prefix}
#define MULTI_MARKER
#define USE_${marker_type.toUpperCase()}
${marker_vert_1.default}
`,
            frag: `\
${frag_prefix}
#define USE_${marker_type.toUpperCase()}
${marker_frag_1.default}
`,
            attributes: Object.assign({ a_position: {
                    buffer: regl.buffer([[-0.5, -0.5], [-0.5, 0.5], [0.5, 0.5], [0.5, -0.5]]),
                    divisor: 0,
                }, a_center(_, props) {
                    return props.center.to_attribute_config();
                },
                a_width(_, props) {
                    return props.width.to_attribute_config();
                },
                a_height(_, props) {
                    return props.height.to_attribute_config();
                },
                a_angle(_, props) {
                    return props.angle.to_attribute_config();
                },
                a_aux(_, props) {
                    return props.aux.to_attribute_config();
                },
                a_linewidth(_, props) {
                    return props.linewidth.to_attribute_config();
                },
                a_line_color(_, props) {
                    return props.line_color.to_attribute_config();
                },
                a_fill_color(_, props) {
                    return props.fill_color.to_attribute_config();
                },
                a_line_cap(_, props) {
                    return props.line_cap.to_attribute_config();
                },
                a_line_join(_, props) {
                    return props.line_join.to_attribute_config();
                },
                a_show(_, props) {
                    return props.show.to_attribute_config();
                } }, attributes),
            uniforms: {
                u_canvas_size: regl.prop("canvas_size"),
                u_pixel_ratio: regl.prop("pixel_ratio"),
                u_antialias: regl.prop("antialias"),
                u_size_hint: regl.prop("size_hint"),
                u_border_radius: regl.prop("border_radius"),
            },
            count: 4,
            primitive: "triangle fan",
            instances: regl.prop("nmarkers"),
            blend: {
                enable: true,
                func: {
                    srcRGB: "one",
                    srcAlpha: "one",
                    dstRGB: "one minus src alpha",
                    dstAlpha: "one minus src alpha",
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