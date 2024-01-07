function springEvaluateStateWithDerivative( initialState, dt, derivative ){
    let state = {
      x: initialState.x + derivative.dx * dt,
      v: initialState.v + derivative.dv * dt,
      tension: initialState.tension,
      friction: initialState.friction
    };

    return { dx: state.v, dv: springAccelerationForState( state ) };
  }