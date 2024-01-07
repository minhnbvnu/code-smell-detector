function injectFixture(src) {
    Fixture = new Function(src + '\nreturn Fixture;')();

    if (typeof Fixture === 'undefined') {
      setStatus('Failed');
      output.innerHTML = 'Please name your root component "Fixture"';
    } else {
      prerender().then(function () {
        if (getBooleanQueryParam('hydrate')) {
          render();
        }
      });
    }
  }