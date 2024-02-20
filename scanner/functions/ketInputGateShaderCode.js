function ketInputGateShaderCode(letter) {
    return `
        //////// INPUT GATE ${letter} ////////
        uniform float _gen_input_default_${letter};
        uniform float _gen_input_offset_${letter};
        uniform float _gen_input_span_${letter};
        
        float read_input_${letter}() {
            return _gen_input_span_${letter} == 0.0
                ? _gen_input_default_${letter}
                : mod(floor(full_out_id / _gen_input_offset_${letter}), _gen_input_span_${letter});
        }`;
}