function generateTestUI(uiBuilder) {
  const panel = uiBuilder.panel({
    name: 'Metrics'
  });

  const container = uiBuilder.container({
    name: 'Metrics Panel',
    layout: 'vertical',
    interactions: ['REORDERABLE', 'DRAG_OUT']
  });
  panel.child(container);

  const metricAcceleration = uiBuilder.metric({
    title: 'Acceleration',
    streams: ['/vehicle/acceleration'],
    description: 'The acceleration of the vehicle'
  });
  container.child(metricAcceleration);

  const plot = uiBuilder.plot({
    title: 'Cost',
    description: 'Costs considered in planning the vehicle trajectory',
    independentVariable: '/motion_planning/time',
    dependentVariables: [
      '/motion_planning/trajectory/cost/cost1',
      '/motion_planning/trajectory/cost/cost2',
      '/motion_planning/trajectory/cost/cost3'
    ]
  });
  container.child(plot);

  const video = uiBuilder.video({
    cameras: ['/camera/image_00', '/camera/image_01', '/camera/image_02', '/camera/image_03']
  });
  container.child(video);

  return panel;
}