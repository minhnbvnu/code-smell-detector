function consumeStatusBar(statusBar) {
  let statusBarItem = new StatusBarItem();
  let currentBufferDisposable = null;
  let tooltipDisposable = null;

  const updateTile = _.debounce(buffer => {
    getLineEndings(buffer).then(lineEndings => {
      if (lineEndings.size === 0) {
        let defaultLineEnding = getDefaultLineEnding();
        buffer.setPreferredLineEnding(defaultLineEnding);
        lineEndings = new Set().add(defaultLineEnding);
      }
      statusBarItem.setLineEndings(lineEndings);
    });
  }, 0);

  disposables.add(
    atom.workspace.observeActiveTextEditor(editor => {
      if (currentBufferDisposable) currentBufferDisposable.dispose();

      if (editor && editor.getBuffer) {
        let buffer = editor.getBuffer();
        updateTile(buffer);
        currentBufferDisposable = buffer.onDidChange(({ oldText, newText }) => {
          if (!statusBarItem.hasLineEnding('\n')) {
            if (newText.indexOf('\n') >= 0) {
              updateTile(buffer);
            }
          } else if (!statusBarItem.hasLineEnding('\r\n')) {
            if (newText.indexOf('\r\n') >= 0) {
              updateTile(buffer);
            }
          } else if (oldText.indexOf('\n')) {
            updateTile(buffer);
          }
        });
      } else {
        statusBarItem.setLineEndings(new Set());
        currentBufferDisposable = null;
      }

      if (tooltipDisposable) {
        disposables.remove(tooltipDisposable);
        tooltipDisposable.dispose();
      }
      tooltipDisposable = atom.tooltips.add(statusBarItem.element, {
        title() {
          return `File uses ${statusBarItem.description()} line endings`;
        }
      });
      disposables.add(tooltipDisposable);
    })
  );

  disposables.add(
    new Disposable(() => {
      if (currentBufferDisposable) currentBufferDisposable.dispose();
    })
  );

  statusBarItem.onClick(() => {
    const editor = atom.workspace.getActiveTextEditor();
    atom.commands.dispatch(
      atom.views.getView(editor),
      'line-ending-selector:show'
    );
  });

  let tile = statusBar.addRightTile({ item: statusBarItem, priority: 200 });
  disposables.add(new Disposable(() => tile.destroy()));
}