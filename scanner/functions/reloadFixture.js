function reloadFixture(code) {
    renders = 0;
    unmountComponent(output);
    injectFixture(code);
  }