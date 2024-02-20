function createComments(iterations) {
    var comments = [];
    for (var i = 1; i < iterations; i++) {
      var comment = {
        id: i
      };
      for (var j = 1; j < 40; j++) {
        comment['thing_' + j] = 'test_content_' + j;
      }
      comments.push(comment);
    }
    return comments;
  }