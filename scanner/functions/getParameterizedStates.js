function getParameterizedStates() {
    return {
      'main': {},
      'main.other': { sticky: true, views: { 'other@main': {} } },
      'main.product': { sticky: true, views: { 'product@main': {} }, url: '/:product_id' },
      'main.product.something': {}
    };
  }