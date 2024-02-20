function createWeeklyTopPostsEmailHtml(topPosts) {
  let emailHtml = '<h1>Here are this week\'s top posts:</h1>';
  Object.keys(topPosts).forEach(function(postId) {
    const post = topPosts[postId];
    emailHtml += '<h2>' + escape(post.title) + '</h2><div>Author: ' + escape(post.author) +
        '</div><div>Stars: ' + escape(post.starCount) + '</div><p>' + escape(post.body) + '</p>';
  });
  return emailHtml;
}