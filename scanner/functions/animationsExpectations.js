function animationsExpectations(anims, props) {
      for (const [prop, opts] of Object.entries(props)) {
        const anim = anims._properties.get(prop);
        expect(anim).withContext(prop).toBeInstanceOf(Object);
        if (anim) {
          for (const [name, value] of Object.entries(opts)) {
            expect(anim[name]).withContext('"' + name + '" of ' + JSON.stringify(anim)).toEqual(value);
          }
        }
      }
    }