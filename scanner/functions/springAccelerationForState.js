function springAccelerationForState( state ){
    return (-state.tension * state.x) - (state.friction * state.v);
  }