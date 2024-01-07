function _defineColor(name, defaultValue) {
    defineProp({
        name: name,
        defaultValue: defaultValue,
        getterFunc: function () {
            // HACK: since we can't detect whether a user is going to set a color property
            // after calling this getter (i.e doing material.ambient.r = 0.5) we must assume
            // the worst and flag the shader as dirty.
            // This means currently animating a material color is horribly slow.
            this._dirtyShader = true;
            return this[`_${name}`];
        }
    });

    defineUniform(name, (material, device, scene) => {
        const uniform = material._allocUniform(name, () => new Float32Array(3));
        const color = material[name];
        const gamma = material.useGammaTonemap && scene.gammaCorrection;

        if (gamma) {
            uniform[0] = Math.pow(color.r, 2.2);
            uniform[1] = Math.pow(color.g, 2.2);
            uniform[2] = Math.pow(color.b, 2.2);
        } else {
            uniform[0] = color.r;
            uniform[1] = color.g;
            uniform[2] = color.b;
        }

        return uniform;
    });
}