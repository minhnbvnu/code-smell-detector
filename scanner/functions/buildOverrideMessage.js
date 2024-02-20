function buildOverrideMessage() {
  const fcmMessage = buildCommonMessage();
  const apnsOverride = {
    'payload': {
      'aps': {
        'badge': 1
      }
    },
    'headers': {
      'apns-priority': '10'
    }
  };

  const androidOverride = {
    'notification': {
      'click_action': 'android.intent.action.MAIN'
    }
  };

  fcmMessage['message']['android'] = androidOverride;
  fcmMessage['message']['apns'] = apnsOverride;

  return fcmMessage;
}