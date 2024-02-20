function NNFFToolbox() {
  const classes = useStyles();
  const { state, dispatch } = useState();
  const { nn_state } = useNNState();
  return (
    <div className={classes.root}>
      <Grid container className={classes.header} direction="row">
        <Grid item>
          <Typography variant="h6" className={classes.floatRight}>
            Layer {nn_state.selectedLayerIndex + 1} of {nn_state.layers.length}
          </Typography>
          <NNFFBuildPanelDetails />
        </Grid>
      </Grid>
    </div>
  );
}