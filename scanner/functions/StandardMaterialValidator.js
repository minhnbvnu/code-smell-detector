constructor() {
        this.removeInvalid = true;

        this.valid = true; // start off valid

        this.enumValidators = {
            occludeSpecular: this._createEnumValidator([
                SPECOCC_NONE,
                SPECOCC_AO,
                SPECOCC_GLOSSDEPENDENT
            ]),
            cull: this._createEnumValidator([
                CULLFACE_NONE,
                CULLFACE_BACK,
                CULLFACE_FRONT,
                CULLFACE_FRONTANDBACK
            ]),
            blendType: this._createEnumValidator([
                BLEND_SUBTRACTIVE,
                BLEND_ADDITIVE,
                BLEND_NORMAL,
                BLEND_NONE,
                BLEND_PREMULTIPLIED,
                BLEND_MULTIPLICATIVE,
                BLEND_ADDITIVEALPHA,
                BLEND_MULTIPLICATIVE2X,
                BLEND_SCREEN,
                BLEND_MIN,
                BLEND_MAX
            ]),
            depthFunc: this._createEnumValidator([
                FUNC_NEVER,
                FUNC_LESS,
                FUNC_EQUAL,
                FUNC_LESSEQUAL,
                FUNC_GREATER,
                FUNC_NOTEQUAL,
                FUNC_GREATEREQUAL,
                FUNC_ALWAYS
            ]),
            shadingModel: this._createEnumValidator([
                SPECULAR_PHONG,
                SPECULAR_BLINN
            ])
        };
    }