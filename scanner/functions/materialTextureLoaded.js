function materialTextureLoaded () {
      const material = el.components.material;
      const instance = material.shader;
      assert.equal(instance.material['_texture_' + 'otherMap'].image.getAttribute('src'),
                   VIDEO);
      el.removeEventListener('materialtextureloaded', materialTextureLoaded);
      done();
    }