function getVideoPanel(builder) {
  const panel = builder.panel({
    name: 'Camera'
  });

  const video = builder.video({
    cameras: [
      '/camera/cam_front',
      '/camera/cam_front_left',
      '/camera/cam_front_right',
      '/camera/cam_back',
      '/camera/cam_back_left',
      '/camera/cam_back_right'
    ]
  });

  panel.child(video);

  return panel;
}