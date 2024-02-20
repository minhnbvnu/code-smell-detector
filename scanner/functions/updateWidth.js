function updateWidth({
  styleSheet,
  className,
  width
}) {
  stylesheet.updateProperties(
    window,
    styleSheet,
    className,
    {
      width: `${width}px`,
      minWidth: `${width}px`,
      maxWidth: `${width}px`
    }
  );
}