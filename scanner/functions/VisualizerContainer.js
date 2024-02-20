function VisualizerContainer() {
  const classes = useStyles();
  const steps = getSteps();
  const { state, dispatch } = useState();
  const { model_state, model_dispatch } = useModelState();

  function getProgressBarValue() {
    if (state.stepper_finish) {
      return 200;
    }
    return (100 * (getActiveStep(state) + 1)) / StepperStateOrder.length;
  }

  const getIsSelected = (value) =>
    [
      state.task,
      state.dataset_category,
      state.sample_dataset,
      state.model,
      ...state.nlp_models,
      ...state.preprocessors,
    ].includes(value);

  const handleNext = async () => {
    dispatch({
      type: Actions.STEPPER_HANDLE_NEXT,
      model_state,
      model_dispatch,
    });
  };

  const handleBack = () => {
    dispatch({
      type: Actions.STEPPER_HANDLE_PREVIOUS,
    });
  };

  const handleFinish = () => {
    dispatch({
      type: Actions.HANDLE_STEPPER_FINISH,
    });
  };

  function isNextDisabled() {
    if (
      state.stepper_state === StepperState.DATASET &&
      state.dataset_category === DatasetCategory.SAMPLE &&
      state.sample_dataset == null
    ) {
      return true;
    }
    if (state.stepper_state === StepperState.VISUALIZE) {
      return false;
    }
    return (
      state.stepper_state !== StepperState.PREPROCESSORS &&
      !getOptions(state).some((val) => getIsSelected(val.label))
    );
  }

  const SelectedOptionLabel = (index) => {
    let option = null;
    switch (index) {
      case 0:
        option = taskFormatter(state.task);
        break;
      case 1:
        option = datasetFormatter(state.dataset_category, state.sample_dataset);
        break;
      case 2:
        if (state.task === Tasks.NATURAL_LANGUAGE) {
          option = nlpModelFormatter(state.nlp_models).join(", ");
        } else {
          option = modelFormatter(state.model);
        }
        break;
      case 3:
        option = preprocessorFormatter(state.preprocessors).join(", ");
        break;
      case 4:
        option = "Visualize";
        break;
      default:
        break;
    }
    return option;
  };

  function getVizContent() {
    if (state.stepper_finish) {
      return <StepperFinish />;
    }
    if (state.stepper_state === StepperState.VISUALIZE) {
      return <PlotsContainer />;
    }
    return <VisualizerOptionSelectionGrid />;
  }

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      className={classes.fullHeight}
    >
      {/* Nav Bar */}
      <Grid
        container
        direction="row"
        style={{
          height: "82px",
          padding: "16px 28px 16px 28px",
          justifyContent: "center",
        }}
      >
        <Grid item style={{ float: "left", width: "50px" }}>
          {getActiveStep(state) > 0 ? (
            <IconButton
              onClick={handleBack}
              className={classes.button}
              style={{ float: "left" }}
              component="span"
            >
              <ArrowBack />
            </IconButton>
          ) : null}
        </Grid>
        <Grid
          item
          style={{
            margin: "0 auto",
            alignSelf: "center",
            width: `${state.stepper_finish ? "130px" : "540px"}`,
          }}
        >
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            {StepperStateOrder.map((step, index) => {
              if (getActiveStep(state) === index && !state.stepper_finish) {
                return (
                  <Typography color="textPrimary" style={{ fontSize: "16px" }}>
                    {String(index + 1) + ". " + getSteps()[index]}
                  </Typography>
                );
              } else if (
                getActiveStep(state) > index &&
                !state.stepper_finish
              ) {
                return (
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "16px" }}
                  >
                    {SelectedOptionLabel(index)}
                  </Typography>
                );
              }
              return null;
            })}
            {state.stepper_finish && (
              <Typography color="textPrimary" style={{ fontSize: "18px" }}>
                Code Display
              </Typography>
            )}
            }
          </Breadcrumbs>
        </Grid>
        <Grid item style={{ float: "right" }}>
          {!state.stepper_finish && (
            <IconButton
              disabled={isNextDisabled()}
              variant="contained"
              onClick={
                getActiveStep(state) === steps.length - 1
                  ? handleFinish
                  : handleNext
              }
              className={
                isNextDisabled()
                  ? classes.nextButtonDisabled
                  : classes.nextButton
              }
              style={{ float: "right" }}
            >
              <ArrowForward
                className={
                  isNextDisabled() ? classes.arrowDisabled : classes.arrow
                }
              />
            </IconButton>
          )}
        </Grid>
      </Grid>
      {/* Progress Bar */}
      <Grid item style={{ width: "100%" }}>
        <BorderLinearProgress
          variant="determinate"
          value={getProgressBarValue()}
        />
      </Grid>
      <Grid className={`${classes.fullWidth} ${classes.visualizerHeight}`} item>
        <Card
          className={
            state.stepper_finish
              ? classes.rootActionsFinish
              : classes.rootActions
          }
        >
          <CardContent
            className={`${classes.fullHeight} ${
              state.stepper_state === StepperState.VISUALIZE
                ? classes.rightMargin
                : null
            }`}
          >
            {getVizContent()}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}