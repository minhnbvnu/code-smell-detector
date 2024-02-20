function regl_marker_hatch(regl, marker_type) {
        const hatch_attributes = {
            a_hatch_pattern(_, props) {
                return props.hatch_pattern.to_attribute_config();
            },
            a_hatch_scale(_, props) {
                return props.hatch_scale.to_attribute_config();
            },
            a_hatch_weight(_, props) {
                return props.hatch_weight.to_attribute_config();
            },
            a_hatch_color(_, props) {
                return props.hatch_color.to_attribute_config();
            },
        };
        return regl_marker(regl, marker_type, ["HATCH"], ["HATCH"], hatch_attributes);
    }