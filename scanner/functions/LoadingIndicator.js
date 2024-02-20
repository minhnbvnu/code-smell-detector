function LoadingIndicator({
  height = null,
  delay = 500,
  ...rest
}) {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  useEffectAfterTimeout(() => setVisible(true), delay);

  let style = {};
  if (height) {
    style.height = height;
  }

  if (!visible) {
    return height ? <div style={style} /> : null;
  }

  return (
    <div className={classes.root} style={style} {...rest}>
      <CircularProgress />
    </div>
  );
}