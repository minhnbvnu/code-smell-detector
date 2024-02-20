function getCommentBlock(data) {
    // RegEx from https://github.com/yavorskiy/comment-parser/blob/master/parser.js
    var RE_COMMENT_START = /^\s*\/\*\*\s*$/m;
    var RE_COMMENT_END = /^\s*\*\/\s*$/m;
    var commentStart = data.match(RE_COMMENT_START);
    var commentEnd = data.match(RE_COMMENT_END);
    if (commentStart && commentEnd) {
      var commentBlock = data.substring(commentStart['index'] + 4, commentEnd['index']);
      commentBlock = commentBlock.replace(/\*/g, '');
      commentBlock = commentBlock.trim();
      return commentBlock;
    } else {
      return null;
    }
  }