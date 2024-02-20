function NNFFBuildPanelDetails() {
  const classes = useStyles();
  const { nn_state, nn_dispatch } = useNNState();

  return (
    <Grid container direction="column">
      <LayerOption
        layer={nn_state.layers[nn_state.selectedLayerIndex]}
        layerIndex={nn_state.selectedLayerIndex}
        nn_dispatch={nn_dispatch}
      />
      <Grid className={classes.actionItem} item>
        <Button
          disabled={nn_state.layers.length === 1}
          color="secondary"
          className={classes.button}
          variant="outlined"
          onClick={() =>
            onLayerRemove(nn_state.selectedLayerIndex, nn_dispatch)
          }
        >
          Remove layer {nn_state.selectedLayerIndex + 1}
        </Button>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          className={`${classes.button} ${classes.marginTOP}`}
          variant="outlined"
          onClick={() => onLayerAdd(nn_dispatch)}
        >
          Add Hidden Layer
        </Button>
      </Grid>
    </Grid>
  );
}