function sendWeeklyTopPostEmail(users, emailHtml) {
  Object.keys(users).forEach(function(uid) {
    const user = users[uid];
    if (user.email) {
      const mailOptions = {
        from: '"Firebase Database Quickstart" <noreply@firebase.com>',
        to: user.email,
        subject: 'This week\'s top posts!',
        html: emailHtml
      };
      mailTransport.sendMail(mailOptions).then(function() {
        console.log('Weekly top posts email sent to: ' + user.email);
        // Save the date at which we sent the weekly email.
        // [START basic_write]
        return firebase.database().ref().child('/users/' + uid + '/lastSentWeeklyTimestamp')
            .set(firebase.database.ServerValue.TIMESTAMP);
        // [END basic_write]
      }).catch(function(error) {
        console.log('Failed to send weekly top posts email:', error);
      });
    }
  });
}