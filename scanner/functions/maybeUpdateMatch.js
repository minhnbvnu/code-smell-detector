function maybeUpdateMatch(cm) {
    if (cm.state.failedTagMatch) doMatchTags(cm);
  }