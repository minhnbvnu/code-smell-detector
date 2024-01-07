constructor(statusBar) {
    this.statusBar = statusBar;
    this.element = document.createElement('grammar-selector-status');
    this.element.classList.add('grammar-status', 'inline-block');
    this.grammarLink = document.createElement('a');
    this.grammarLink.classList.add('inline-block');
    this.element.appendChild(this.grammarLink);

    this.activeItemSubscription = atom.workspace.observeActiveTextEditor(
      this.subscribeToActiveTextEditor.bind(this)
    );

    this.configSubscription = atom.config.observe(
      'grammar-selector.showOnRightSideOfStatusBar',
      this.attach.bind(this)
    );
    const clickHandler = event => {
      event.preventDefault();
      atom.commands.dispatch(
        atom.views.getView(atom.workspace.getActiveTextEditor()),
        'grammar-selector:show'
      );
    };
    this.element.addEventListener('click', clickHandler);
    this.clickSubscription = new Disposable(() => {
      this.element.removeEventListener('click', clickHandler);
    });
  }