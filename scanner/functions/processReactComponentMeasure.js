function processReactComponentMeasure(name, startTime, currentProfilerData, state) {
  if (name.startsWith('--component-render-start-')) {
    const [componentName] = name.substr(25).split('-');
    assertNoOverlappingComponentMeasure(state);
    state.currentReactComponentMeasure = {
      componentName,
      timestamp: startTime,
      duration: 0,
      type: 'render',
      warning: null
    };
  } else if (name === '--component-render-stop') {
    assertCurrentComponentMeasureType(state, 'render');

    if (state.currentReactComponentMeasure !== null) {
      const componentMeasure = state.currentReactComponentMeasure;
      componentMeasure.duration = startTime - componentMeasure.timestamp;
      state.currentReactComponentMeasure = null;
      currentProfilerData.componentMeasures.push(componentMeasure);
    }
  } else if (name.startsWith('--component-layout-effect-mount-start-')) {
    const [componentName] = name.substr(38).split('-');
    assertNoOverlappingComponentMeasure(state);
    state.currentReactComponentMeasure = {
      componentName,
      timestamp: startTime,
      duration: 0,
      type: 'layout-effect-mount',
      warning: null
    };
  } else if (name === '--component-layout-effect-mount-stop') {
    assertCurrentComponentMeasureType(state, 'layout-effect-mount');

    if (state.currentReactComponentMeasure !== null) {
      const componentMeasure = state.currentReactComponentMeasure;
      componentMeasure.duration = startTime - componentMeasure.timestamp;
      state.currentReactComponentMeasure = null;
      currentProfilerData.componentMeasures.push(componentMeasure);
    }
  } else if (name.startsWith('--component-layout-effect-unmount-start-')) {
    const [componentName] = name.substr(40).split('-');
    assertNoOverlappingComponentMeasure(state);
    state.currentReactComponentMeasure = {
      componentName,
      timestamp: startTime,
      duration: 0,
      type: 'layout-effect-unmount',
      warning: null
    };
  } else if (name === '--component-layout-effect-unmount-stop') {
    assertCurrentComponentMeasureType(state, 'layout-effect-unmount');

    if (state.currentReactComponentMeasure !== null) {
      const componentMeasure = state.currentReactComponentMeasure;
      componentMeasure.duration = startTime - componentMeasure.timestamp;
      state.currentReactComponentMeasure = null;
      currentProfilerData.componentMeasures.push(componentMeasure);
    }
  } else if (name.startsWith('--component-passive-effect-mount-start-')) {
    const [componentName] = name.substr(39).split('-');
    assertNoOverlappingComponentMeasure(state);
    state.currentReactComponentMeasure = {
      componentName,
      timestamp: startTime,
      duration: 0,
      type: 'passive-effect-mount',
      warning: null
    };
  } else if (name === '--component-passive-effect-mount-stop') {
    assertCurrentComponentMeasureType(state, 'passive-effect-mount');

    if (state.currentReactComponentMeasure !== null) {
      const componentMeasure = state.currentReactComponentMeasure;
      componentMeasure.duration = startTime - componentMeasure.timestamp;
      state.currentReactComponentMeasure = null;
      currentProfilerData.componentMeasures.push(componentMeasure);
    }
  } else if (name.startsWith('--component-passive-effect-unmount-start-')) {
    const [componentName] = name.substr(41).split('-');
    assertNoOverlappingComponentMeasure(state);
    state.currentReactComponentMeasure = {
      componentName,
      timestamp: startTime,
      duration: 0,
      type: 'passive-effect-unmount',
      warning: null
    };
  } else if (name === '--component-passive-effect-unmount-stop') {
    assertCurrentComponentMeasureType(state, 'passive-effect-unmount');

    if (state.currentReactComponentMeasure !== null) {
      const componentMeasure = state.currentReactComponentMeasure;
      componentMeasure.duration = startTime - componentMeasure.timestamp;
      state.currentReactComponentMeasure = null;
      currentProfilerData.componentMeasures.push(componentMeasure);
    }
  }
}