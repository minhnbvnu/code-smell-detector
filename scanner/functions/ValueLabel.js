function ValueLabel(props) {
  const {
    children,
    classes,
    className,
    open,
    value,
    valueLabelDisplay,
  } = props;

  if (valueLabelDisplay === "off") {
    return children;
  }

  return React.cloneElement(
    children,
    {
      className: clsx(
        children.props.className,
        {
          [classes.open]: open || valueLabelDisplay === "on",
        },
        classes.thumb
      ),
    },
    <span className={clsx(classes.offset, className)}>
      <span className={classes.circle}>
        <span className={classes.label}>{value}</span>
      </span>
    </span>
  );
}