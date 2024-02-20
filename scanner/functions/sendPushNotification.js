function sendPushNotification() {
    navigator.serviceWorker.ready
      .then(function(registration) {
        //Get `push subscription`
        registration.pushManager.getSubscription().then(function (subscription) {
          //Send `push notification` - source for below url `server.js`
          fetch('https://progressive-web-application.herokuapp.com/send_notification', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
          })
          .then(function(response) {
            return response.json();
          })
        })
      })
  }