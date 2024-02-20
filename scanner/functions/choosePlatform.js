function choosePlatform() {

  var options = { debug: debug('grunt-notify')};

  // This needs to be cleaned up to make it easier to add new platforms

  var growl_notify = require('./platforms/growl-notify');

  if (growl_notify.supported(options)) {
    return growl_notify;
  }

  var hey_snarl = require('./platforms/hey-snarl');

  if (hey_snarl.supported(options)) {
    return hey_snarl;
  }

  var notification_center = require('./platforms/notification-center');

  if (notification_center.supported(options)) {
    return notification_center;
  }

  var notify_send = require('./platforms/notify-send');

  if (notify_send.supported(options)) {
    return notify_send;
  }

  var toaster = require('./platforms/toaster');

  if (toaster.supported(options)) {
    return toaster;
  }

  return require('./platforms/no-notifications');
}