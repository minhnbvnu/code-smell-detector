function watchForCvoxLoad(editor) {
  if (cvoxApiExists()) {
    init(editor);
  } else {
    tries++;
    if (tries >= MAX_TRIES) {
      return;
    }
    window.setTimeout(watchForCvoxLoad, 500, editor);
  }
}