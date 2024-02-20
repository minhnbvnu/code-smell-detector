function notificationCenterSupported(options) {
  var IS_MAC = os.type() === 'Darwin';
  var MOUNTAIN_LION;
  try {
    MOUNTAIN_LION = IS_MAC && semver.satisfies(os.release(), '>=12.0.0');
  } catch (e) {
    options.debug({semverError: e });
  }


  options.debug({
    os: os.type(),
    version: os.release(),
    IS_MAC: IS_MAC,
    MOUNTAIN_LION: MOUNTAIN_LION,
    notification_center: MOUNTAIN_LION ? 'Will use Notification Center' : 'Not available for your OS.'
  });

  return IS_MAC && MOUNTAIN_LION;
}