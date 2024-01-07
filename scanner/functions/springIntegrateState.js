function springIntegrateState( state, dt ){
    let a = {
      dx: state.v,
      dv: springAccelerationForState( state )
    },
    b = springEvaluateStateWithDerivative( state, dt * 0.5, a ),
    c = springEvaluateStateWithDerivative( state, dt * 0.5, b ),
    d = springEvaluateStateWithDerivative( state, dt, c ),
    dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
    dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

    state.x = state.x + dxdt * dt;
    state.v = state.v + dvdt * dt;

    return state;
  }