function clearFatCursorMark(cm) {
      var marks = cm.state.fatCursorMarks;
      if (marks) for (var i = 0; i < marks.length; i++) marks[i].clear();
    }