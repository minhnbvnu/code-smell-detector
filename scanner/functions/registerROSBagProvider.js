function registerROSBagProvider(
  rosConfig,
  {converters = DEFAULT_CONVERTERS, BagClass = ROSBag} = {}
) {
  if (rosConfig) {
    console.log(`Setting up ROSProvider with ${rosConfig}`);
  }

  let config = null;
  if (rosConfig) {
    const data = fs.readFileSync(rosConfig);
    if (data) {
      config = JSON.parse(data);
    }
  }

  const ros2xvizFactory = new ROS2XVIZFactory(converters);
  const rosbagProviderConfig = {
    rosConfig: config,
    ros2xvizFactory,
    BagClass
  };

  XVIZProviderFactory.addProviderClass(ROSBagProvider, rosbagProviderConfig);
}