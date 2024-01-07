constructor({ uri }) {
    this.uri = uri;
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      Grim.on('updated', () => {
        etch.update(this);
      })
    );
    // TODO: Remove conditional when the new StyleManager deprecation APIs reach stable.
    if (atom.styles.onDidUpdateDeprecations) {
      this.subscriptions.add(
        atom.styles.onDidUpdateDeprecations(() => {
          etch.update(this);
        })
      );
    }
    etch.initialize(this);
    this.subscriptions.add(
      atom.commands.add(this.element, {
        'core:move-up': () => {
          this.scrollUp();
        },
        'core:move-down': () => {
          this.scrollDown();
        },
        'core:page-up': () => {
          this.pageUp();
        },
        'core:page-down': () => {
          this.pageDown();
        },
        'core:move-to-top': () => {
          this.scrollToTop();
        },
        'core:move-to-bottom': () => {
          this.scrollToBottom();
        }
      })
    );
  }