function useMock() {
      root[component] = Mock;
      jasmine.getEnv().currentSpec.after(uninstallMock);
    }