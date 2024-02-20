function getDeclarativeUI({fakeStreams}) {
  const builder = new XVIZUIBuilder({});

  builder.child(getVideoPanel(builder));

  if (fakeStreams) {
    builder.child(getPlotPanel(builder));
    builder.child(getTablePanel(builder));
  }

  return builder;
}