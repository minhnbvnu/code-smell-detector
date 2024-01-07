constructor() {
    this.miniEditor = new TextEditor({ mini: true });
    this.miniEditor.element.addEventListener('blur', this.close.bind(this));

    this.message = document.createElement('div');
    this.message.classList.add('message');

    this.element = document.createElement('div');
    this.element.classList.add('go-to-line');
    this.element.appendChild(this.miniEditor.element);
    this.element.appendChild(this.message);

    this.panel = atom.workspace.addModalPanel({
      item: this,
      visible: false
    });
    atom.commands.add('atom-text-editor', 'go-to-line:toggle', () => {
      this.toggle();
      return false;
    });
    atom.commands.add(this.miniEditor.element, 'core:confirm', () => {
      this.navigate();
    });
    atom.commands.add(this.miniEditor.element, 'core:cancel', () => {
      this.close();
    });
    this.miniEditor.onWillInsertText(arg => {
      if (arg.text.match(/[^0-9:]/)) {
        arg.cancel();
      }
    });
    this.miniEditor.onDidChange(() => {
      this.navigate({ keepOpen: true });
    });
  }