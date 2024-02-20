function formatComments(state, comments, indent, lineEnd) {
    var length = comments.length;

    for (var i = 0; i < length; i++) {
      var comment = comments[i];
      state.write(indent);
      if (comment.type[0] === 'L') {
        // Line comment
        state.write('// ' + comment.value.trim() + '\n');
      } else {
        // Block comment
        state.write('/*' + lineEnd);
        reindent(state, comment.value, indent, lineEnd);
        state.write(indent + '*/' + lineEnd);
      }
    }
  }