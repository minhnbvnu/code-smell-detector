function getIssue24States() {
      return {
        'main': { },
        'main.product': { url: '/products/:product_id' },
        'main.product.something': {},
        'main.product.something.tab1': { sticky: true, views: { 'tab1@main.product.something': {} } },
        'main.product.something.tab2': { sticky: true, views: { 'tab2@main.product.something': {} } }
      };
    }