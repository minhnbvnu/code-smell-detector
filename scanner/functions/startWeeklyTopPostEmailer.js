function startWeeklyTopPostEmailer() {
  // Run this job every Sunday at 2:30pm.
  schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function () {
    // List the top 5 posts.
    // [START top_posts_query]
    const topPostsRef = firebase.database().ref('/posts').orderByChild('starCount').limitToLast(5);
    // [END top_posts_query]
    const allUserRef = firebase.database().ref('/users');
    Promise.all([topPostsRef.once('value'), allUserRef.once('value')]).then(function(resp) {
      const topPosts = resp[0].val();
      const allUsers = resp[1].val();
      const emailText = createWeeklyTopPostsEmailHtml(topPosts);
      sendWeeklyTopPostEmail(allUsers, emailText);
    }).catch(function(error) {
      console.log('Failed to start weekly top posts emailer:', error);
    });
  });
  console.log('Weekly top posts emailer started...');
}