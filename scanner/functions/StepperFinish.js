function StepperFinish() {
  const classes = useStyles();
  const { state } = useState();
  const { nn_state } = useNNState();
  const {model_state} = useModelState();
  const [codeCopied, setCodeCopied] = React.useState(false);

  const copyToClipboard = (setCopied = true) => {
    navigator.clipboard.writeText(CodeGen(state, nn_state, model_state));
    setCodeCopied(setCopied);
  };

  const openInCollab = async () => {
    copyToClipboard(true);
    await new Promise((r) => setTimeout(r, 1200));
    window
      .open("https://colab.research.google.com/#create=true", "_blank")
      .focus();
  };

  return (
    <>
      <Typography className={classes.titleInner} color="textPrimary">
        You're all set to continue the journey!
      </Typography>
      <Grid
        direction="row"
        container
        justify="center"
        spacing={2}
        style={{ marginBottom: "8px" }}
      >
        <Grid item>
          <Tooltip
            title={codeCopied ? "Code copied!" : "Copy code"}
            placement="top"
          >
            <IconButton
              onClick={copyToClipboard}
              color="primary"
              component="span"
            >
              {codeCopied ? <AssignmentTurnedInIcon /> : <AssignmentIcon />}
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Launch Google Collab" placement="top">
            <IconButton onClick={openInCollab} color="primary" component="span">
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Reset Otto" placement="top">
            <IconButton
              onClick={() => {
                window.location.reload();
                return false;
              }}
              color="primary"
              component="span"
            >
              <RotateLeftIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <CodeContainer getIsShown={() => true} />
    </>
  );
}