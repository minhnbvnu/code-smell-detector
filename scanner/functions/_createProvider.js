function _createProvider() {
    return {
      meta: {
        title: 'Open Auth',
        mode: 'direct',
        scene: false,
        inner: true,
        bean: 'open',
        render: null,
        validator: null,
        icon: { f7: ':role:shield-key' },
      },
    };
  }