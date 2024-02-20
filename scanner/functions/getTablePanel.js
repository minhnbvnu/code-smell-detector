function getTablePanel(builder) {
  const panel = builder.panel({
    name: 'Perception'
  });

  const table = builder.treetable({
    title: 'Perception',
    description: 'Objects identified by perception',
    stream: '/perception/objects/table',
    displayObjectId: true
  });

  panel.child(table);

  return panel;
}