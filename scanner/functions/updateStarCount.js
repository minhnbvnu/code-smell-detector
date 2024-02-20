function updateStarCount(postRef) {
  postRef.transaction(function(post) {
    if (post) {
      post.starCount = post.stars ? Object.keys(post.stars).length : 0;
    }
    return post;
  });
}