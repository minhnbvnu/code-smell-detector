function getPlotPanel(builder) {
  const panel = builder.panel({
    name: 'Planning'
  });

  const plot = builder.plot({
    title: 'Cost',
    description: 'Costs considered in planning the vehicle trajectory',
    independentVariable: '/motion_planning/time',
    dependentVariables: [
      '/motion_planning/trajectory/cost/cost1',
      '/motion_planning/trajectory/cost/cost2',
      '/motion_planning/trajectory/cost/cost3'
    ]
  });

  panel.child(plot);

  return panel;
}