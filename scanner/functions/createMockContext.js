function createMockContext({ position, controls } = {}) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const controlContainer = document.createElement('div');
  controlContainer.className = `mapboxgl-ctrl-${position || 'top-left'}`;
  container.appendChild(controlContainer);

  return {
    context: {
      container,
      options: {
        controls,
        keybindings: true
      },
      api: {
        trash: spy()
      },
      events: {
        changeMode: spy()
      }
    },
    cleanup() {
      document.body.removeChild(container);
    },
    getControlContainer() {
      return controlContainer;
    }
  };
}