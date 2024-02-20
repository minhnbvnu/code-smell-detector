function uniforms(opts) {
      opts = opts || {}
      return {
        color: {
          type: 'c',
          value: new THREE.Color(color.senary)
        },
        alpha: { type: 'f', value: 0.4 },
        pointSize: { type: 'f', value: 10 },
        shouldResize: { type: '1i', value: opts.shouldResize ? 1 : 0 }
      }
    }