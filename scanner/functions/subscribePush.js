function subscribePush() {
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        alert('Your browser doesn\'t support push notification.');
        return false;
      }

      //To subscribe `push notification` from push manager
      registration.pushManager.subscribe({
        userVisibleOnly: true //Always show notification when received
      })
      .then(function (subscription) {
        toast('Subscribed successfully.');
        console.info('Push notification subscribed.');
        changePushStatus(true);
        sendPushNotification();
      })
      .catch(function (error) {
        changePushStatus(false);
        console.error('Push notification subscription error: ', error);
      });
    })
  }