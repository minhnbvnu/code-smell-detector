constructor(viewUniformFormat, viewBindGroupFormat, vertexFormat) {

        // construct a sparse array
        this.uniformFormats[BINDGROUP_VIEW] = viewUniformFormat;
        this.bindGroupFormats[BINDGROUP_VIEW] = viewBindGroupFormat;

        this.vertexFormat = vertexFormat;
    }