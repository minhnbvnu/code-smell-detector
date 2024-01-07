constructor(name, index, options = {}) {

        Debug.assert(/^[a-zA-Z][_a-zA-Z0-9]*$/.test(name), `ShaderPass name can only contain letters, numbers and underscores and start with a letter: ${name}`);

        this.name = name;
        this.index = index;

        // assign options as properties to this object
        Object.assign(this, options);

        this.initShaderDefines();
    }