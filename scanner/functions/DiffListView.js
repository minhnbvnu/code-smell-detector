constructor() {
    this.selectListView = new SelectListView({
      emptyMessage: 'No diffs in file',
      items: [],
      filterKeyForItem: diff => diff.lineText,
      elementForItem: diff => {
        const li = document.createElement('li');
        li.classList.add('two-lines');

        const primaryLine = document.createElement('div');
        primaryLine.classList.add('primary-line');
        primaryLine.textContent = diff.lineText;
        li.appendChild(primaryLine);

        const secondaryLine = document.createElement('div');
        secondaryLine.classList.add('secondary-line');
        secondaryLine.textContent = `-${diff.oldStart},${diff.oldLines} +${
          diff.newStart
        },${diff.newLines}`;
        li.appendChild(secondaryLine);

        return li;
      },
      didConfirmSelection: diff => {
        this.cancel();
        const bufferRow = diff.newStart > 0 ? diff.newStart - 1 : diff.newStart;
        this.editor.setCursorBufferPosition([bufferRow, 0], {
          autoscroll: true
        });
        this.editor.moveToFirstCharacterOfLine();
      },
      didCancelSelection: () => {
        this.cancel();
      }
    });
    this.selectListView.element.classList.add('diff-list-view');
    this.panel = atom.workspace.addModalPanel({
      item: this.selectListView,
      visible: false
    });
  }