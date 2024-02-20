function DraggableWrapper({ children, usePaper, ...props }) {
  if (usePaper) {
    return (
      <Paper {...props} elevation={4}>
        {children}
      </Paper>
    );
  }
  return <div {...props}>{children}</div>;
}