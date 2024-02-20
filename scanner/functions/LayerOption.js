function LayerOption({ layer, layerIndex, nn_dispatch }) {
  const classes = useStyles();
  if (layer == null) {
    return null;
  }
  return (
    <Grid className={classes.layerInputItem} item>
      {/* <Grid style={{ "margin-top": "28px" }} item>
          <Divider />
        </Grid> */}
      <Grid item>
        <Grid direction="row" className={classes.nodesItem} container>
          <Grid item>
            <Typography className={classes.nodesLabel} gutterBottom>
              Nodes
            </Typography>
          </Grid>
          <Grid className={classes.sliderWidth} item>
            <Slider
              value={layer.units}
              valueLabelDisplay="on"
              ValueLabelComponent={ValueLabelDisplay}
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event, units) =>
                onNodesChanged(layerIndex, units, nn_dispatch)
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.actionItem}>
        <FormControl className={classes.actionWidth}>
          <InputLabel>Activation Function</InputLabel>
          <Select
            value={layer.activation}
            onChange={(event) =>
              onLayerActivationChange(event, layerIndex, nn_dispatch)
            }
          >
            {Object.keys(Activations).map((key) => (
              <MenuItem value={Activations[key]}>{Activations[key]}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item className={classes.actionItem}>
        <FormControl className={classes.actionWidth}>
          <InputLabel>Weight Initializer</InputLabel>
          <Select
            value={layer.initializer}
            onChange={(event) =>
              onLayerInitializerChange(event, layerIndex, nn_dispatch)
            }
          >
            {Object.keys(Initializers).map((key) => (
              <MenuItem value={Initializers[key]}>{Initializers[key]}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}