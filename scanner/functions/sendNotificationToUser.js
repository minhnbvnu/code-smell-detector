function sendNotificationToUser(uid, postId) {
  // Fetch the user's email.
  const userRef = firebase.database().ref('/users/' + uid);
  userRef.once('value').then(function(snapshot) {
    const email = snapshot.val().email;
    // Send the email to the user.
    // [START_EXCLUDE]
    if (email) {
      sendNotificationEmail(email).then(function() {
        // Save the date at which we sent that notification.
        // [START write_fan_out]
        const update = {};
        update['/posts/' + postId + '/lastNotificationTimestamp'] =
            firebase.database.ServerValue.TIMESTAMP;
        update['/user-posts/' + uid + '/' + postId + '/lastNotificationTimestamp'] =
            firebase.database.ServerValue.TIMESTAMP;
        firebase.database().ref().update(update);
        // [END write_fan_out]
      });
    }
    // [END_EXCLUDE]
  }).catch(function(error) {
    console.log('Failed to send notification to user:', error);
  });
}