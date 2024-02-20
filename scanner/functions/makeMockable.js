function makeMockable(component) {
    var Original, Mock;

    Original = root[component];
    Mock = mock(Original);

    jasmine[component] = { useMock: useMock, uninstallMock: uninstallMock };

    function useMock() {
      root[component] = Mock;
      jasmine.getEnv().currentSpec.after(uninstallMock);
    }

    function uninstallMock() {
      root[component] = Original;
    }
  }