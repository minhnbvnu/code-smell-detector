function activate() {
  disposables = new CompositeDisposable();
  let selectorDisposable;
  let selector;

  disposables.add(
    atom.commands.add('atom-text-editor', {
      'line-ending-selector:show': () => {
        // Initiating Selector object - called only once when `line-ending-selector:show` is called
        if (!selectorDisposable) {
          // make a Selector object
          selector = new Selector([
            { name: 'LF', value: '\n' },
            { name: 'CRLF', value: '\r\n' }
          ]);
          // Add disposable for selector
          selectorDisposable = new Disposable(() => selector.dispose());
          disposables.add(selectorDisposable);
        }

        selector.show();
      },

      'line-ending-selector:convert-to-LF': event => {
        const editorElement = event.target.closest('atom-text-editor');
        setLineEnding(editorElement.getModel(), '\n');
      },

      'line-ending-selector:convert-to-CRLF': event => {
        const editorElement = event.target.closest('atom-text-editor');
        setLineEnding(editorElement.getModel(), '\r\n');
      }
    })
  );
}