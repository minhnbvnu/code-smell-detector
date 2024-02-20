function generateTestData(xvizWriter) {
  const uiBuilder = new XVIZUIBuilder();
  uiBuilder.child(generateTestUI(uiBuilder));

  const metaBuilder = new XVIZMetadataBuilder();
  metaBuilder.ui(uiBuilder);
  metaBuilder.startTime(1000.1);
  metaBuilder.endTime(1005.3);
  metaBuilder
    .stream('/vehicle_pose')
    .category('pose')

    .stream('/vehicle/acceleration')
    .category('time_series')
    .type('float')
    .unit('m/s^2')

    .stream('/objects')
    .category('primitive')
    .type('polygon')
    .streamStyle({
      stroke_color: '#AABBCC',
      stroke_width: 1.4
    });

  xvizWriter.writeMetadata(metaBuilder.getMetadata());

  const builder = new XVIZBuilder();
  builder
    .pose('/vehicle_pose')
    .timestamp(1000.1)
    .mapOrigin(0, 0, 0);

  builder
    .timeSeries('/vehicle/acceleration')
    .timestamp(1000.1)
    .value(10.7);

  builder.primitive('/objects').polygon([1, 1, 1, 3, 3, 3, 4, 4, 4]);

  xvizWriter.writeMessage(0, builder.getMessage());
}