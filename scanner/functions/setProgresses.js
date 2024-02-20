function setProgresses(list) {
    // adjust progressbar
    prepareProgressbars(list.length);
    // setProgress
    for (const progressNo in list) {
      const _item = list[progressNo];
      setProgress({
        progressNo,
        total: _item.total,
        progress: _item.progress,
        text: _item.text,
      });
    }
  }