constructor(selectorItems) {
    // Defining a SelectListView with methods - https://github.com/atom/atom-select-list
    this.lineEndingListView = new SelectListView({
      // an array containing the objects you want to show in the select list
      items: selectorItems,

      // called whenever an item needs to be displayed.
      elementForItem: lineEnding => {
        const element = document.createElement('li');
        element.textContent = lineEnding.name;
        return element;
      },

      // called to retrieve a string property on each item and that will be used to filter them.
      filterKeyForItem: lineEnding => {
        return lineEnding.name;
      },

      // called when the user clicks or presses Enter on an item. // use `=>` for `this`
      didConfirmSelection: lineEnding => {
        const editor = atom.workspace.getActiveTextEditor();
        if (editor instanceof TextEditor) {
          setLineEnding(editor, lineEnding.value);
        }
        this.hide();
      },

      // called when the user presses Esc or the list loses focus. // use `=>` for `this`
      didCancelSelection: () => {
        this.hide();
      }
    });

    // Adding SelectListView to panel
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lineEndingListView
    });
  }