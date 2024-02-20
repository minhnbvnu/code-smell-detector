function onUpdatePlot() {
    model_dispatch({
      type: ModelActions.LINREG_SET_IND_VAR,
      linreg_x_name: indVar,
    });
    invokeLinReg(model_dispatch, state.sample_dataset, indVar, false);
  }